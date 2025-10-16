# Issue Labels Guide

This document outlines the standard labels used to categorize and track issues and pull requests in this repository.

## ⚠️ Priority

| Label | Color | Description |
| :--- | :--- | :--- |
| **priority:critical** | `b91c1c` | Showstopper — blocks deployment/release and needs immediate attention. |
| **priority:high** | `ef4444` | High-impact bug/feature that should be resolved soon. |
| **priority:medium** | `f59e0b` | Medium priority; important but not urgent. |
| **priority:low** | `10b981` | Low priority or nice-to-have improvements. |

---

## 🏷️ Status

| Label | Color | Description |
| :--- | :--- | :--- |
| **status:triage** | `8b5cf6` | Needs initial review / prioritization. |
| **status:in-progress** | `0ea5e9` | Work is actively being done. |
| **status:blocked** | `374151` | Blocked by external dependency or decision. |
| **status:needs-review** | `6366f1` | Implementation done; waiting peer review. |
| **status:ready** | `16a34a` | Ready to merge or release after passing checks. |
| **status:duplicate** | `9ca3af` | Duplicate of another issue/PR. |
| **status:wontfix** | `6b7280` | Intentionally will not be fixed or implemented. |

---

## 🛠️ Type

| Label | Color | Description |
| :--- | :--- | :--- |
| **type:bug** | `d73a4a` | Reported defect or unexpected behavior. |
| **type:feature** | `0ea5e9` | New feature request or user-facing capability. |
| **type:enhancement** | `7c3aed` | Improvement to existing functionality. |
| **type:docs** | `0366d6` | Documentation change, README, guides. |
| **type:security** | `b91c1c` | Security issue or vulnerability. Follow security policy. |
| **type:performance** | `f97316` | Perf improvement or performance regression. |
| **type:refactor** | `475569` | Code cleanup or internal reorganization (no new features). |
| **type:test** | `059669` | Add/modify unit/integration/e2e tests. |
| **type:design** | `fb7185` | UI/UX or graphic design work (mockups, assets). |
| **type:research** | `f59e0b` | Spike / feasibility research / PoC work. |
| **type:accessibility** | `fbbf24` | a11y-related fixes or improvements. |
| **type:question** | `94a3b8` | Clarifying question or needs more info from reporter. |

---

## 🗺️ Area / Component

| Label | Color | Description |
| :--- | :--- | :--- |
| **area:ui** | `ef476f` | UI / frontend components / styling. |
| **area:backend** | `0ea5e9` | Backend logic, server routes, DB interactions. |
| **area:ai** | `f59e0b` | AI prompts, model integration, heuristics. |
| **area:pdf** | `6d28d9` | PDF templates, generation, layout logic. |
| **area:auth** | `fb7185` | Authentication, NextAuth, session handling. |
| **area:infra** | `8b5cf6` | Deployment, CI/CD, hosting configuration. |
| **area:api** | `06b6d4` | Public/private API endpoints and contracts. |
| **area:tests** | `059669` | Testing infra and frameworks. |

---

## 🤝 Community & Maintenance

| Label | Color | Description |
| :--- | :--- | :--- |
| **good first issue** | `10b981` | Friendly for newcomers — small, well-scoped task. |
| **help wanted** | `7c3aed` | Looking for external contributors/help. |
| **discussion** | `6b7280` | Topic for broader design/strategy discussion. |
| **needs-info** | `f97316` | More info needed from issue author. |
| **accepted** | `16a34a` | Maintainer accepted the idea / plan. |
| **blocked-by** | `374151` | Blocked by an external task/issue (link refs encouraged). |
| **wontfix** | `6b7280` | Not planned to be fixed or implemented. |
| **good-practice** | `64748b` | Suggestion for code quality / best practice. |
| **roadmap** | `f59e0b` | Items planned for a future milestone / epic. |

---

## ⚙️ CI / Release / Specifics

| Label | Color | Description |
| :--- | :--- | :--- |
| **release** | `0369a1` | Tasks related to release management / changelog. |
| **breaking-change** | `b91c1c` | Change that will break backward compatibility. |
| **regression** | `f97316` | New bug that reintroduced a previously fixed issue. |
| **ci-failure** | `ef4444` | CI/build/test failure requiring attention. |
| **deps** | `64748b` | Dependency updates or security patch updates. |
| **security:critical** | `7f1d1d` | Critical security vulnerability — urgent handling. |
| **test:unit** | `16a34a` | Unit test related issue. |
| **test:integration** | `059669` | Integration test related. |
| **test:e2e** | `059669` | End-to-end testing and flakiness. |
| **test:flaky** | `f59e0b` | Flaky/unstable test requiring investigation. |
| **qa:manual** | `fb7185` | Manual QA steps or testing checklist needed. |
| **docs:improvement** | `0366d6` | Improvements to docs, examples, or tutorials. |
| **design-system** | `7c3aed` | Work related to theming, tokens, Tailwind config. |
| **accessibility** | `fbbf24` | Accessibility issues or audits. |
| **performance** | `f97316` | Perf profiling, suggestions, or tickets. |

---

## 🦾 Custom labels

we use custom labels for events and other ongoing things like hackatons, challenges, etc.