# 🔒 Security Policy & Guidelines

This document describes the **security measures**, **responsible usage policies**, and **reporting procedures** for PatchMyResume.  
Please review these carefully if you are deploying or contributing to this project.

---

## 📜 Security Principles

PatchMyResume is designed with the following global standards in mind:

- **Privacy by Design** – We minimize stored data and avoid persisting unnecessary user information.  
- **OWASP Best Practices** – API, authentication, and session handling follow OWASP security recommendations.  
- **Data Ownership** – Users own their API keys and resume data.  
- **Transparency** – Clear terms and warnings are displayed before AI usage.  
- **Responsible Disclosure** – Security issues must be reported privately before public discussion.

---

## 🔐 Data Storage & Handling

| Data Type | Storage Location | Security Measures | Retention Policy |
|-----------|-----------------|-------------------|-----------------|
| **Gemini API Key** | Appwrite DB (hashed) | Secure hash + server-side only | Never exposed in plaintext |
| **AI Model Choice** | Appwrite DB | Plain string for model selection | Retained until user changes it |
| **Resume User Data** | Appwrite DB (stringified JSON) | User-only access via Appwrite Auth | Permanent until user deletes |
| **Job Description** | In-memory (session/local only) | Never saved to DB | Cleared after request |
| **AI Suggestions** | In-memory (session/local only) | Never stored | Cleared after session |
| **Final PDF** | Client device only | Generated locally via PDF-LIB | Never uploaded or stored |

---

## 🌐 API & Backend Security

- **Transport Layer**  
  - All routes served exclusively over **HTTPS**.  
  - CSRF protection enabled for session-based requests.  

- **Authentication & Authorization**  
  - Powered by **NextAuth + Appwrite**.  
  - Protected routes (resume CRUD, AI requests) require valid sessions.  
  - Access tokens are scoped and time-limited.  

- **Rate Limiting**  
  - AI requests: **3 requests/minute per user**.  
  - Global per-IP limit to prevent abuse.  
  - Repeated violations trigger temporary bans.  

- **Error Responses**  
  - Generic error messages returned (to avoid information leaks).  
  - No internal stack traces exposed in production.  

---

## 🛡️ User Account Security

- **Login Activity Logging**  
  - Each login stores: `user_id + ip + timestamp`.  
  - New IP logins trigger email notification.  

- **Session Protection**  
  - Session tokens validated server-side.  
  - Expired/invalid sessions are denied automatically.  
  - No long-lived tokens without refresh cycles.  

- **Password Security**  
  - Managed fully by Appwrite (secure hashing, salted).  
  - Project does **not** implement custom password storage.  

---

## ⚠️ Usage Warnings

- **API Key Ownership**  
  - Users provide their **own Google Gemini API Key**.  
  - All costs are billed directly to the user’s Google account.  
  - The project and maintainers are **not responsible** for usage charges.  

- **Terms & Consent**  
  - Terms are displayed before first AI request.  
  - Continuing with the workflow means you agree to it.  

---

## 🚧 Abuse & DDoS Prevention

- Rate limiting applied at both **user** and **IP** levels.  
- Public routes restricted to **read-only**.  
- Authenticated routes require valid sessions.  
- Suspicious requests are logged and may be blocked.  

---

## 📢 Reporting Security Issues

We take security seriously.  
If you discover a vulnerability or security concern:

1. **Do NOT disclose publicly** in Discussions or PRs.  
2. Open a **GitHub Issue** with the label **`security`**.  
3. Provide a clear description (steps to reproduce, impact, and suggested fix if possible).  

We will review and patch issues as quickly as possible.  

---

## ✅ Summary

PatchMyResume follows a **secure-by-default** approach:

- ✅ API keys hashed & stored securely  
- ✅ User data private to account owner  
- ✅ HTTPS, rate limiting, and auth enforced  
- ✅ AI requests never persist sensitive info  
- ✅ Transparent terms & consent before AI usage  
- ✅ Responsible disclosure via GitHub Issues (`security` label)  

These measures provide a **global standard security baseline** for development, contribution, and deployment.

> If you wish to not provide any data to us, feel free to host locally by following the Installation Guide in [Readme.md](./README.md)!
