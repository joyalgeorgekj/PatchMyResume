# Security Guidelines

This document outlines the security precautions implemented in this project.  
Please review carefully if you are contributing or deploying this application.

---

## 🔐 Data Storage

- **API Key**
  - Encrypted before storing in Appwrite Database.
  - Decrypted only in-memory when required for API requests.
  - Never exposed in plaintext.

- **Model**
  - Stored in Appwrite Database as plain string.
  - Used to select the AI model for requests.

- **Resume User Data**
  - Stored in Appwrite Database as stringified JSON.
  - Only accessible by the authenticated user.

---

## 🌐 API Security

- All API routes are served over **HTTPS**.
- **Rate limiting** applied:
  - Max 3 requests per minute per user for AI calls.
  - Global limit applied per IP to prevent abuse.
- **Authentication required** for protected routes:
  - Resume CRUD operations.
  - AI request endpoints.

---

## 🛡️ User Account Security

- **IP Logging**
  - Each login stores `user_id + ip + timestamp`.
  - New IP logins trigger an email notification to the user.

- **Session Protection**
  - Tokens and sessions are validated via Appwrite.
  - Expired or invalid sessions are denied access.

---

## ⚠️ Usage Warnings

- **AI Requests**
  - Users provide their own API keys.
  - Costs are incurred by the user directly with the AI provider.
  - Application is **not responsible** for any charges.

- **Terms & Conditions**
  - Displayed before first AI call.
  - Users must agree before continuing.
  - Consent is required via checkbox confirmation.

---

## 🚧 DDoS & Abuse Prevention

- Rate limiting in place (per user and per IP).
- Public routes restricted to read-only operations.
- Protected routes require authentication.
- Requests are monitored and suspicious activity is logged.

---

## ✅ Summary

This project uses:
- Encrypted API key storage.
- Strict route and API restrictions.
- Rate limiting and DDoS protection.
- User login monitoring and alerts.
- Transparent terms and warnings for AI usage.

These measures provide a **secure baseline** for development and deployment.
