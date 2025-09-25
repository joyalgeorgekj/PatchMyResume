---
name: 🧹 Refactor, Chore, or Docs
about: For internal code quality, documentation, or administrative tasks.
title: "[REFACTOR]: "
labels: ["type:refactor", "status:needs-review"]
assignees: ["Joyal-George-KJ"]
---

## 💡 What was cleaned up/changed?
Addresses: #<ISSUE_NUMBER> (If applicable)

## ✅ Verification Steps (Internal Check)
1. Run **`pnpm lint`** to confirm no new linting errors.
2. Run **`pnpm test`** (Jest and Playwright) to confirm all tests pass and there are no regressions.
3. If dependencies were changed, confirm the application runs correctly locally.

---

## 🔍 PR Checklist: Quality & Standards

### 🛡️ Project Governance & Conduct
- [ ] I have followed project guidelines and checked for duplicates.

### ⚙️ Code Quality & Testing
- [ ] **Conventional Commit:** The PR title follows the `[TYPE]: Subject` format (e.g., `[CHORE]: Update Next.js`).
- [ ] **Scope:** The changes are purely internal and **do not** introduce new user-facing functionality.
- [ ] **Test Coverage:** Existing test coverage has been maintained or improved.

## 🧪 Testing Notes

