# Google Workspace Email Setup

The website is configured to send contact, enquiry, newsletter and booking notifications through Google Workspace Gmail SMTP.

## Vercel environment variables

Add these under **Vercel → Project → Settings → Environment Variables**:

```text
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=info@kencroftstrategy.in
SMTP_PASSWORD=YOUR_GOOGLE_APP_PASSWORD
NOTIFY_EMAIL=info@kencroftstrategy.in
EMAIL_FROM_NAME=Kencroft Strategy Group
```

Do **not** use your normal Google Workspace password.

## Create the Google App Password

1. Sign in to `info@kencroftstrategy.in` in Google.
2. Open your Google Account security settings.
3. Make sure 2-Step Verification is enabled.
4. Open **App passwords**.
5. Create an app password (for example, name it `Vercel Website`).
6. Copy the generated 16-character app password.
7. Paste that value into Vercel as `SMTP_PASSWORD`.
8. Redeploy the Vercel project.

If your Google Workspace administrator has disabled app passwords, ask the administrator to allow the required authentication method or use a transactional email provider instead.

## Sending and receiving

The website sends notifications from `info@kencroftstrategy.in` to `NOTIFY_EMAIL`. When a visitor submits a contact, enquiry or booking form, the visitor's email is placed in the **Reply-To** header so you can reply directly to them from Gmail.
