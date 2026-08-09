from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

import os
import html
import logging
import secrets
import uuid
from contextlib import asynccontextmanager
from datetime import datetime, timezone, timedelta
from zoneinfo import ZoneInfo
from typing import List, Optional, Annotated

import bcrypt
import jwt
import httpx
import smtplib
from email.message import EmailMessage
from bson import ObjectId
from fastapi import FastAPI, APIRouter, HTTPException, Request, Depends
from fastapi.responses import JSONResponse
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field, EmailStr, BeforeValidator, ConfigDict

logging.basicConfig(level=logging.INFO,
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

IST = ZoneInfo("Asia/Kolkata")

# ---------------------------------------------------------------- DB
mongo_url = os.environ.get('MONGO_URL')
if not mongo_url:
    raise RuntimeError("MONGO_URL must be configured")

# Never disable MongoDB TLS certificate verification in production.
client = AsyncIOMotorClient(mongo_url, serverSelectionTimeoutMS=5000)
db = client[os.environ.get('DB_NAME', 'app_db')]

# ---------------------------------------------------------------- Config
JWT_ALGORITHM = "HS256"
JWT_TTL_SECONDS = 43200
JWT_SECRET = os.environ.get('JWT_SECRET')
if not JWT_SECRET or len(JWT_SECRET) < 32:
    raise RuntimeError("JWT_SECRET must be configured and at least 32 characters long")
SMTP_HOST = os.environ.get("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.environ.get("SMTP_PORT", "587"))
SMTP_USER = os.environ.get("SMTP_USER", "info@kencroftstrategy.in")
SMTP_PASSWORD = os.environ.get("SMTP_PASSWORD")
EMAIL_FROM_NAME = os.environ.get("EMAIL_FROM_NAME", "Kencroft Strategy Group")
NOTIFY_EMAIL = os.environ.get("NOTIFY_EMAIL", "info@kencroftstrategy.in")
if not SMTP_PASSWORD:
    logger.warning("SMTP_PASSWORD is not configured; email notifications will be skipped")

COOKIE_SECURE = os.environ.get("COOKIE_SECURE", "true").lower() == "true"
CORS_ORIGINS = [o.strip() for o in os.environ.get('CORS_ORIGINS', '').split(',') if o.strip()]

# Small in-memory rate limiter. For multiple server instances, put a real rate
# limiter (e.g. Redis/API gateway) in front of the service as well.
RATE_LIMIT_WINDOW = 60
RATE_LIMITS = {
    "/api/auth/login": 10,
    "/api/enquiries": 8,
    "/api/contact": 8,
    "/api/newsletter": 10,
    "/api/bookings": 8,
}
_rate_state = {}


def client_ip(request: Request) -> str:
    return request.client.host if request.client else "unknown"


def enforce_rate_limit(request: Request, key: str):
    limit = RATE_LIMITS.get(key)
    if not limit:
        return
    now = datetime.now(timezone.utc).timestamp()
    bucket_key = (client_ip(request), key)
    start, count = _rate_state.get(bucket_key, (now, 0))
    if now - start >= RATE_LIMIT_WINDOW:
        start, count = now, 0
    count += 1
    _rate_state[bucket_key] = (start, count)
    if count > limit:
        raise HTTPException(status_code=429, detail="Too many requests. Please try again later.")


def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))


def create_access_token(user_id: str, email: str) -> tuple[str, str]:
    jti = secrets.token_urlsafe(24)
    payload = {"sub": user_id, "email": email, "jti": jti,
               "iat": datetime.now(timezone.utc),
               "exp": datetime.now(timezone.utc) + timedelta(seconds=JWT_TTL_SECONDS),
               "type": "access"}
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM), jti


def escape(value) -> str:
    return html.escape("" if value is None else str(value), quote=True)


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def now_ist():
    return datetime.now(IST)


class EnquiryCreate(BaseModel):
    full_name: str
    company_name: Optional[str] = ""
    business_name: Optional[str] = ""
    job_title: Optional[str] = ""
    email: EmailStr
    phone: str
    city: Optional[str] = ""
    property_type: Optional[str] = ""
    services: List[str] = Field(default_factory=list)
    timeline: Optional[str] = ""
    message: Optional[str] = ""
    consent: bool = False


class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = ""
    subject: Optional[str] = ""
    message: str


class NewsletterCreate(BaseModel):
    email: EmailStr


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


SLOT_TIMES = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
              "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30"]


class BookingCreate(BaseModel):
    full_name: str
    email: EmailStr
    phone: str
    company_name: Optional[str] = ""
    topic: Optional[str] = ""
    date: str
    time: str


def _parse_date(date_str: str):
    try:
        return datetime.strptime(date_str, "%Y-%m-%d").date()
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid date format. Use YYYY-MM-DD.")


def validate_booking_datetime(date_str: str, time_str: str):
    d = _parse_date(date_str)
    if d < now_ist().date():
        raise HTTPException(status_code=400, detail="Cannot book a date in the past.")
    if d.weekday() == 6:
        raise HTTPException(status_code=400, detail="We are closed on Sundays. Please choose another day.")
    if time_str not in SLOT_TIMES:
        raise HTTPException(status_code=400, detail="Invalid time slot.")
    if d == now_ist().date():
        slot = datetime.strptime(f"{date_str} {time_str}", "%Y-%m-%d %H:%M").replace(tzinfo=IST)
        if slot <= now_ist():
            raise HTTPException(status_code=400, detail="That time has already passed. Please choose another slot.")
    return d


@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        await db.users.create_index("email", unique=True)
        await db.bookings.create_index([("date", 1), ("time", 1)], unique=True)
        await db.revoked_tokens.create_index("revoked_at", expireAfterSeconds=JWT_TTL_SECONDS)
        admin_email = os.environ.get("ADMIN_EMAIL")
        admin_password = os.environ.get("ADMIN_PASSWORD")
        if admin_email and admin_password:
            admin_email = admin_email.lower()
            existing = await db.users.find_one({"email": admin_email})
            if existing is None:
                await db.users.insert_one({"email": admin_email, "password_hash": hash_password(admin_password),
                                           "name": "Admin", "role": "admin", "created_at": now_iso()})
                logger.info("Admin seeded")
        else:
            logger.warning("ADMIN_EMAIL/ADMIN_PASSWORD not set; no admin account was seeded")
    except Exception as e:
        logger.error(f"Startup DB init error: {e}")
    yield
    client.close()


app = FastAPI(title="Kencroft Strategy Group API", lifespan=lifespan)
api_router = APIRouter(prefix="/api")


async def get_current_admin(request: Request) -> dict:
    token = request.cookies.get("access_token")
    if not token:
        auth = request.headers.get("Authorization", "")
        if auth.startswith("Bearer "):
            token = auth[7:]
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        if payload.get("type") != "access" or not payload.get("jti"):
            raise HTTPException(status_code=401, detail="Invalid token")
        if await db.revoked_tokens.find_one({"jti": payload["jti"]}):
            raise HTTPException(status_code=401, detail="Token revoked")
        user = await db.users.find_one({"_id": ObjectId(payload["sub"])})
        if not user or user.get("role") != "admin":
            raise HTTPException(status_code=403, detail="Administrator access required")
        if request.method not in {"GET", "HEAD", "OPTIONS"}:
            csrf_cookie = request.cookies.get("csrf_token")
            csrf_header = request.headers.get("X-CSRF-Token")
            if not csrf_cookie or not csrf_header or not secrets.compare_digest(csrf_cookie, csrf_header):
                raise HTTPException(status_code=403, detail="CSRF validation failed")
        return {"id": str(user["_id"]), "email": user["email"], "role": user.get("role")}
    except (jwt.ExpiredSignatureError, jwt.InvalidTokenError, ValueError):
        raise HTTPException(status_code=401, detail="Invalid or expired token")


async def send_notification(subject: str, html_body: str, reply_to: Optional[str] = None):
    subject = subject.replace("\r", " ").replace("\n", " ")
    if not SMTP_PASSWORD or not SMTP_USER or not NOTIFY_EMAIL:
        logger.warning("Skipping notification because SMTP configuration is incomplete")
        return

    def _send():
        msg = EmailMessage()
        msg["Subject"] = subject
        msg["From"] = f"{EMAIL_FROM_NAME} <{SMTP_USER}>"
        msg["To"] = NOTIFY_EMAIL
        if reply_to:
            msg["Reply-To"] = reply_to
        msg.set_content("This message contains HTML content. Please view it in an HTML-capable email client.")
        msg.add_alternative(html_body, subtype="html")

        with smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=25) as smtp:
            smtp.ehlo()
            smtp.starttls()
            smtp.ehlo()
            smtp.login(SMTP_USER, SMTP_PASSWORD)
            smtp.send_message(msg)

    try:
        import asyncio
        await asyncio.to_thread(_send)
        logger.info("Notification email sent: %s", subject)
    except Exception as e:
        logger.error("Email notification failed: %s", e)


@app.middleware("http")
async def request_rate_limit(request: Request, call_next):
    path = request.url.path
    if request.method == "POST" and path in RATE_LIMITS:
        try:
            enforce_rate_limit(request, path)
        except HTTPException as exc:
            return JSONResponse(status_code=exc.status_code, content={"detail": exc.detail})
    response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    response.headers["Permissions-Policy"] = "camera=(), microphone=(), geolocation=()"
    if COOKIE_SECURE:
        response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
    return response


@api_router.get("/")
async def root():
    return {"message": "Kencroft Strategy Group API"}


@api_router.post("/enquiries")
async def create_enquiry(payload: EnquiryCreate):
    if not payload.consent:
        raise HTTPException(status_code=400, detail="Consent is required to submit this enquiry.")
    doc = payload.model_dump()
    doc.update(id=str(uuid.uuid4()), type="enquiry", status="new", created_at=now_iso())
    await db.enquiries.insert_one(doc)
    values = {
        "Full Name": payload.full_name, "Company": payload.company_name,
        "Business": payload.business_name, "Job Title": payload.job_title,
        "Email": payload.email, "Phone": payload.phone, "City": payload.city,
        "Property Type": payload.property_type,
        "Services": ", ".join(payload.services), "Timeline": payload.timeline,
        "Message": payload.message,
    }
    rows = "".join(f"<tr><td style='padding:6px 12px;color:#64748b'>{escape(k)}</td><td style='padding:6px 12px;color:#0f172a'>{escape(v)}</td></tr>" for k, v in values.items())
    html_body = f"<h2 style='font-family:Georgia,serif;color:#050B14'>New Consultation Request</h2><table style='border-collapse:collapse;font-family:Arial'>{rows}</table>"
    await send_notification(f"New Consultation Request — {escape(payload.full_name)}", html_body, str(payload.email))
    return {"status": "success", "message": "Thank you. Our consulting team will contact you shortly."}


@api_router.post("/contact")
async def create_contact(payload: ContactCreate):
    doc = payload.model_dump()
    doc.update(id=str(uuid.uuid4()), type="contact", status="new", created_at=now_iso())
    await db.enquiries.insert_one(doc)
    html_body = (f"<h2 style='font-family:Georgia,serif;color:#050B14'>New Contact Message</h2>"
                 f"<p><b>{escape(payload.name)}</b> ({escape(payload.email)}, {escape(payload.phone)})</p>"
                 f"<p><b>Subject:</b> {escape(payload.subject)}</p><p>{escape(payload.message)}</p>")
    await send_notification(f"New Contact Message — {escape(payload.name)}", html_body, str(payload.email))
    return {"status": "success", "message": "Thank you. Our consulting team will contact you shortly."}


@api_router.post("/newsletter")
async def subscribe(payload: NewsletterCreate):
    existing = await db.newsletter.find_one({"email": payload.email.lower()})
    if not existing:
        await db.newsletter.insert_one({"id": str(uuid.uuid4()), "email": payload.email.lower(), "created_at": now_iso()})
    return {"status": "success", "message": "You are subscribed to Kencroft Insights."}


@api_router.get("/availability")
async def availability(date: str):
    d = _parse_date(date)
    now = now_ist()
    today = now.date()
    if d < today:
        return {"date": date, "available": False, "reason": "past", "slots": []}
    if d.weekday() == 6:
        return {"date": date, "available": False, "reason": "closed", "slots": []}
    booked = await db.bookings.find({"date": date}, {"_id": 0, "time": 1}).to_list(200)
    booked_times = {b["time"] for b in booked}
    slots = []
    for t in SLOT_TIMES:
        past = d == today and datetime.strptime(t, "%H:%M").time() <= now.time()
        slots.append({"time": t, "booked": t in booked_times or past})
    return {"date": date, "available": True, "slots": slots}


@api_router.post("/bookings")
async def create_booking(payload: BookingCreate):
    validate_booking_datetime(payload.date, payload.time)
    existing = await db.bookings.find_one({"date": payload.date, "time": payload.time})
    if existing:
        raise HTTPException(status_code=409, detail="That slot was just booked. Please choose another time.")
    doc = payload.model_dump()
    doc.update(id=str(uuid.uuid4()), status="scheduled", created_at=now_iso())
    try:
        await db.bookings.insert_one(doc)
    except Exception:
        raise HTTPException(status_code=409, detail="That slot was just booked. Please choose another time.")
    html_body = (f"<h2 style='font-family:Georgia,serif;color:#050B14'>New Discovery Call Booking</h2>"
                 f"<p><b>{escape(payload.full_name)}</b> ({escape(payload.email)}, {escape(payload.phone)})</p>"
                 f"<p><b>Company:</b> {escape(payload.company_name) or '—'}</p>"
                 f"<p><b>Date:</b> {escape(payload.date)} &nbsp; <b>Time:</b> {escape(payload.time)} IST</p>"
                 f"<p><b>Topic:</b> {escape(payload.topic) or '—'}</p>")
    await send_notification(f"New Discovery Call — {escape(payload.full_name)} ({payload.date} {payload.time})", html_body, str(payload.email))
    return {"status": "success", "message": f"Your discovery call is confirmed for {payload.date} at {payload.time} IST. We look forward to speaking with you."}


@api_router.post("/auth/login")
async def login(payload: LoginRequest, request: Request):
    from fastapi.responses import JSONResponse
    email = payload.email.lower()
    user = await db.users.find_one({"email": email})
    if not user or user.get("role") != "admin" or not verify_password(payload.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    token, jti = create_access_token(str(user["_id"]), email)
    csrf = secrets.token_urlsafe(32)
    resp = JSONResponse({"id": str(user["_id"]), "email": email, "role": "admin"})
    resp.set_cookie("access_token", token, httponly=True, secure=COOKIE_SECURE, samesite="lax", max_age=JWT_TTL_SECONDS, path="/")
    resp.set_cookie("csrf_token", csrf, httponly=False, secure=COOKIE_SECURE, samesite="lax", max_age=JWT_TTL_SECONDS, path="/")
    return resp


@api_router.post("/auth/logout")
async def logout(request: Request):
    from fastapi.responses import JSONResponse
    token = request.cookies.get("access_token")
    if token:
        try:
            payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM], options={"verify_exp": False})
            if payload.get("jti"):
                await db.revoked_tokens.update_one({"jti": payload["jti"]}, {"$set": {"revoked_at": datetime.now(timezone.utc)}}, upsert=True)
        except jwt.InvalidTokenError:
            pass
    resp = JSONResponse({"status": "success"})
    resp.delete_cookie("access_token", path="/")
    resp.delete_cookie("csrf_token", path="/")
    return resp


@api_router.get("/auth/me")
async def me(admin: dict = Depends(get_current_admin)):
    return admin


@api_router.get("/admin/leads")
async def list_leads(admin: dict = Depends(get_current_admin), lead_type: Optional[str] = None):
    query = {"type": lead_type} if lead_type else {}
    leads = await db.enquiries.find(query, {"_id": 0}).sort("created_at", -1).to_list(1000)
    subs = await db.newsletter.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    bookings = await db.bookings.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return {"leads": leads, "newsletter": subs, "bookings": bookings,
            "stats": {"total": len(leads), "enquiries": len([l for l in leads if l.get("type") == "enquiry"]),
                      "contacts": len([l for l in leads if l.get("type") == "contact"]),
                      "subscribers": len(subs), "bookings": len(bookings)}}


@api_router.patch("/admin/leads/{lead_id}")
async def update_lead(lead_id: str, body: dict, admin: dict = Depends(get_current_admin)):
    await db.enquiries.update_one({"id": lead_id}, {"$set": {"status": body.get("status", "new")}})
    return {"status": "success"}


app.include_router(api_router)

if CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_credentials=True,
        allow_origins=CORS_ORIGINS,
        allow_methods=["GET", "POST", "PATCH", "OPTIONS"],
        allow_headers=["Content-Type", "Authorization", "X-CSRF-Token"],
    )
