"""Backend API tests for Kencroft Strategy Group."""
import os
import uuid
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://hospitality-strategy-2.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"

ADMIN_EMAIL = os.environ.get("ADMIN_EMAIL", "admin@example.com")
ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD", "")


@pytest.fixture(scope="session")
def s():
    return requests.Session()


@pytest.fixture(scope="session")
def token(s):
    r = s.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
    assert r.status_code == 200, r.text
    return r.cookies.get("access_token")


# ---------- Public: root ----------
def test_root(s):
    r = s.get(f"{API}/")
    assert r.status_code == 200
    assert "message" in r.json()


# ---------- Public: enquiries ----------
def test_create_enquiry(s):
    payload = {
        "full_name": "TEST_Lead User",
        "company_name": "TEST_Co",
        "business_name": "TEST_Hotel",
        "job_title": "GM",
        "email": f"test_{uuid.uuid4().hex[:8]}@example.com",
        "phone": "+919000000000",
        "city": "Mumbai",
        "property_type": "Luxury Hotel",
        "services": ["Operational Excellence"],
        "timeline": "1-3 Months",
        "message": "TEST message",
        "consent": True,
    }
    r = s.post(f"{API}/enquiries", json=payload)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data["status"] == "success"


def test_enquiry_invalid_email(s):
    r = s.post(f"{API}/enquiries", json={"full_name": "x", "email": "notanemail", "phone": "1", "consent": True})
    assert r.status_code == 422


# ---------- Public: contact ----------
def test_create_contact(s):
    payload = {
        "name": "TEST_Contact",
        "email": f"test_{uuid.uuid4().hex[:8]}@example.com",
        "phone": "+919000000001",
        "subject": "TEST Subject",
        "message": "TEST body message",
    }
    r = s.post(f"{API}/contact", json=payload)
    assert r.status_code == 200
    assert r.json()["status"] == "success"


# ---------- Public: newsletter ----------
def test_newsletter_subscribe(s):
    email = f"test_{uuid.uuid4().hex[:8]}@example.com"
    r = s.post(f"{API}/newsletter", json={"email": email})
    assert r.status_code == 200
    assert r.json()["status"] == "success"
    # idempotent
    r2 = s.post(f"{API}/newsletter", json={"email": email})
    assert r2.status_code == 200


# ---------- Auth ----------
def test_login_wrong_password(s):
    r = s.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": "wrong-password"})
    assert r.status_code == 401


def test_login_success_and_me(s, token):
    assert isinstance(token, str) and len(token) > 20
    r = s.get(f"{API}/auth/me", cookies={"access_token": token, "csrf_token": s.cookies.get("csrf_token", "")})
    assert r.status_code == 200
    assert r.json()["email"] == ADMIN_EMAIL


def test_admin_leads_unauthenticated(s):
    r = requests.get(f"{API}/admin/leads")
    assert r.status_code == 401


def test_admin_leads_authenticated(s, token):
    r = requests.get(f"{API}/admin/leads", cookies={"access_token": token, "csrf_token": s.cookies.get("csrf_token", "")})
    assert r.status_code == 200
    data = r.json()
    assert "leads" in data and "newsletter" in data and "stats" in data
    assert isinstance(data["leads"], list)
    # verify data persistence - our TEST_ leads should be present
    names = [l.get("full_name") or l.get("name") for l in data["leads"]]
    assert any(n and "TEST_" in n for n in names), "Recently created TEST_ leads not present in admin listing"
    # verify no _id leaks
    for l in data["leads"][:5]:
        assert "_id" not in l


def test_logout(s, token):
    r = requests.post(f"{API}/auth/logout")
    assert r.status_code == 200
