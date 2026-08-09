# Kencroft Strategy Group — Vercel Deployment

This package is prepared for a **single Vercel project**: the React frontend and FastAPI backend are deployed together on the same domain. The browser calls `/api/...`, so you do not need a separate backend URL or second Vercel project.

## Shortest deployment path

### 1. Put the project on GitHub
Upload the contents of this folder to a new GitHub repository.

### 2. Import into Vercel
Open **Vercel → Add New → Project**, select the GitHub repository, and deploy it.

Do not set a Root Directory. Keep the repository root as the project root.

The included `vercel.json` already configures:
- React production build from `frontend/`
- FastAPI at `api/index.py`
- `/api/*` routing to the backend
- React SPA fallback for all website pages
- production security headers

### 3. Add these Vercel environment variables
Go to **Project → Settings → Environment Variables** and add:

```text
MONGO_URL=your MongoDB Atlas connection string
DB_NAME=kencroft
JWT_SECRET=a-random-secret-at-least-32-characters-long
COOKIE_SECURE=true
ADMIN_EMAIL=your-admin-email
ADMIN_PASSWORD=a-strong-admin-password
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=info@kencroftstrategy.in
SMTP_PASSWORD=your-google-workspace-app-password
NOTIFY_EMAIL=info@kencroftstrategy.in
EMAIL_FROM_NAME=Kencroft Strategy Group
```

For the recommended single-domain deployment, **do not set `CORS_ORIGINS`**.

### 4. Deploy again
Vercel will build the frontend and deploy the Python API automatically.

### 5. Test
Open:
- `/` — website
- `/contact` — contact form
- `/schedule` — booking form
- `/admin/login` — admin login
- `/api/` — API health response

## MongoDB Atlas

Create a MongoDB Atlas database and copy its connection string into `MONGO_URL`.
Allow Vercel to connect to the database. For a simple first deployment, Atlas network access can be configured according to your Atlas security policy; use the narrowest network access available for production.

## Admin account

On the first successful backend startup, if `ADMIN_EMAIL` and `ADMIN_PASSWORD` are present and that email does not already exist, the application creates the admin account.

Change the password if you later rotate credentials. Do not commit `.env` files or passwords to GitHub.

## Google Workspace email notifications

The backend sends enquiry/contact/booking notifications through Google Workspace Gmail SMTP. Use `info@kencroftstrategy.in` as the sending account and create a Google App Password for it. Do not use the normal Google Workspace password.

Add these Vercel environment variables:

```text
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=info@kencroftstrategy.in
SMTP_PASSWORD=your-google-workspace-app-password
NOTIFY_EMAIL=info@kencroftstrategy.in
EMAIL_FROM_NAME=Kencroft Strategy Group
```

If `SMTP_PASSWORD` is missing or SMTP authentication fails, website submissions are still stored in MongoDB and the backend logs the email failure.

## Important Vercel behavior

The backend is a serverless FastAPI function. Do not expect in-memory state such as the small rate limiter to be globally shared between all Vercel instances. For high-volume production traffic, put a distributed rate limiter/WAF in front of the application.
