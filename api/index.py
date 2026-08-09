import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from http.server import BaseHTTPRequestHandler
import json

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        content_length = int(self.headers.get('Content-Length', 0))
        post_data = self.rfile.read(content_length)
        
        try:
            data = json.loads(post_data.decode('utf-8'))
            name = data.get('name', 'Website Visitor')
            visitor_email = data.get('email', '')
            message_body = data.get('message', '')
            subject_input = data.get('subject', 'New Website Inquiry')

            # Fetch Vercel Environment Variables
            smtp_host = os.environ.get('SMTP_HOST', 'smtp.gmail.com')
            smtp_port = int(os.environ.get('SMTP_PORT', 587))
            smtp_user = os.environ.get('SMTP_USER', 'info@kencroftstrategy.in')
            smtp_password = os.environ.get('SMTP_PASSWORD', '')
            notify_email = os.environ.get('NOTIFY_EMAIL', 'info@kencroftstrategy.in')
            from_name = os.environ.get('EMAIL_FROM_NAME', 'Kencroft Strategy Group')

            if not smtp_password:
                self.send_response(500)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'error': 'SMTP_PASSWORD environment variable is missing.'}).encode('utf-8'))
                return

            # Construct Email
            msg = MIMEMultipart('alternative')
            msg['Subject'] = f"[{from_name}] {subject_input}"
            msg['From'] = f"{from_name} <{smtp_user}>"
            msg['To'] = notify_email
            msg['Reply-To'] = visitor_email

            body = f"""
New Inquiry Received from Kencroft Strategy Group Website:

Name: {name}
Email: {visitor_email}
Subject: {subject_input}

Message:
{message_body}
            """
            msg.attach(MIMEText(body, 'plain'))

            # Send via Gmail SMTP
            server = smtplib.SMTP(smtp_host, smtp_port)
            server.starttls()
            server.login(smtp_user, smtp_password)
            server.sendmail(smtp_user, notify_email, msg.as_string())
            server.quit()

            # Success Response
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'status': 'success', 'message': 'Email sent successfully!'}).encode('utf-8'))

        except Exception as e:
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'error': str(e)}).encode('utf-8'))

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
