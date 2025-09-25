# 📄 PatchMyResume: Developer Style Guide & Contribution Rules

This document outlines the coding standards, file conventions, and contribution process for the **PatchMyResume** project. Adhering to these guidelines ensures code quality, consistency, and maintainability across the entire codebase.

---

## 🗺️ Table of Contents

1.  [🛠️ Tools & Environment](#-tools--environment)
2.  [📂 File Structure & Naming](#-file-structure--naming)
3.  [✍️ Code Style & Conventions](#-code-style--conventions)
4.  [🎨 Styling Conventions (TailwindCSS)](#-styling-conventions-tailwindcss)
5.  [🔄 Contribution Workflow & Commits](#-contribution-workflow--commits)
6.  [🔐 Security & Environment Variables](#-security--environment-variables)

---

## 1. 🛠️ Tools & Environment

### 1.1 Language

* **TypeScript (TS/TSX):** All code must be written in TypeScript for type safety and better tooling.

### 1.2 Formatting & Linting

* **Prettier:** Use Prettier for consistent code formatting. The project root contains the configuration (`.prettierrc`).
* **Linting:** Follow the linting rules enforced by the project setup.

---

## 2. 📂 File Structure & Naming

### 2.1 Directory Structure

* All application logic must reside within the **`src/`** directory.
* We strictly follow the **Next.js App Router** conventions.
    * **Pages & Layouts:** Located in `src/app/`.
    * **API Routes:** Located in `src/app/api/`.

### 2.2 File Naming Conventions

| Component/File Type | Convention | Example |
| :--- | :--- | :--- |
| **React Components** (JSX/TSX) | **PascalCase** | `AuthButton.tsx`, `StepFinalPreview.tsx` |
| **Route/Segment Folders** | **lowercase** | `src/app/auth/login/` |
| **API Route Files** | `route.ts` | `src/app/api/ai/suggestions/route.ts` |
| **Config/Tooling Files** | **camelCase** | `crypto.ts`, `pdfHelpers.ts` |

### 2.3 Imports

* Use **Absolute Imports** for all local modules (configured via `@` alias).
    ```typescript
    // ✅ Correct: Absolute Import
    import AuthButton from "@/components/forms/AuthButton";
    import { ResumeUserDataType } from "@/data/constants/types";

    // ❌ Incorrect: Relative Import
    // import AuthButton from "../../components/forms/AuthButton";
    ```
* **Grouping:** Organize imports into distinct blocks with a newline separator:
    1.  Libraries (React, Next, NextAuth, Appwrite, etc.)
    2.  Local Components
    3.  Local Utilities/Types (Hooks, Libs, Data, Styles)

---

## 3. ✍️ Code Style & Conventions

### 3.1 JavaScript/TypeScript Basics

* **Variables:** Use `const` by default. Only use `let` when a variable must be reassigned. **Avoid** `var`.
* **Functions:** Prefer **Arrow Functions** for components and callbacks.
    ```tsx
    const MyComponent = () => { /* ... */ }
    const handleClick = (e: React.MouseEvent) => { /* ... */ }
    ```
* **Props:** Always **destructure props** in the function parameter list for clarity.
    ```tsx
    // ✅ Correct
    const AuthButton = ({ label, Icon, handleLogin }: Props) => { /* ... */ }

    // ❌ Incorrect
    const AuthButton = (props: Props) => { console.log(props.label); /* ... */ }
    ```

### 3.2 Components

* **Modularity:** Components should be small, focused, and highly reusable.
* **Location:**
    * **Reusable UI** goes in `src/components/ui/` (e.g., `Input.tsx`, `Select.tsx`).
    * **App-Specific Logic/Forms** go in `src/components/forms/` (e.g., `ResumeForm.tsx`).

### 3.3 Error Handling

* **Async Calls:** Always wrap asynchronous operations (API calls, database interactions, etc.) in a `try...catch` block.
* **User Feedback:** Show user-friendly error messages (e.g., using toast notifications) while logging detailed errors to the console.

### 3.4 Authentication

* Authentication is managed by **NextAuth**.
* The primary authentication API route is located at: `src/app/api/auth/[...nextauth]/route.ts`.

---

## 4. 🎨 Styling Conventions (TailwindCSS)

### 4.1 Custom Theme Colors

* **Do NOT** use Tailwind's default color classes (e.g., `bg-blue-500`).
* **ALWAYS** use the custom CSS variables defined in the global styles (e.g., `text-primary`, `bg-dark-muted`, `border-ui`).

### 4.2 Class Ordering

* Maintain a **consistent order** for Tailwind utility classes in the `className` attribute.
* **Recommended Order:**
    1.  Layout (`flex`, `grid`, `block`, `absolute`, etc.)
    2.  Spacing (`p-`, `m-`, `gap-`)
    3.  Sizing (`w-`, `h-`, `max-w-`)
    4.  Borders (`border`, `rounded-`, `border-ui`)
    5.  Typography (`font-`, `text-`, `leading-`)
    6.  Background/Color (`bg-primary`, `text-dark`)
    7.  Effects (`shadow`, `opacity`)
    8.  Interactivity/State (`hover:`, `focus:`, `cursor-`)

    ```tsx
    // ✅ Example of proper class ordering
    className="flex items-center gap-2 rounded-xl px-4 py-2 text-base font-medium bg-primary hover:bg-primary-intense shadow transition"
    ```

### 4.3 Theming

* **Do NOT** use Tailwind's built-in `dark:` prefix.
* Theming (light/dark) is handled globally via CSS variables and the `[data-theme='dark']` selector (managed by `NextThemes`).

---

## 5. 🔄 Contribution Workflow & Commits

### 5.1 Branching

* All new features and fixes should be developed in separate, feature-specific branches (e.g., `feat/add-template-selection`, `fix/api-key-hashing`).

### 5.2 Conventional Commits

* We enforce **Conventional Commits** for clear and readable history.
* The commit message must start with a type, followed by a colon and a space:

| Type | Description | Example |
| :--- | :--- | :--- |
| **`feat:`** | A new feature or major addition. | `feat: implement PDF-LIB for export` |
| **`fix:`** | A bug fix. | `fix: correct Appwrite response handling` |
| **`docs:`** | Changes to documentation only. | `docs: update README with new section` |
| **`style:`** | Formatting, missing semi-colons, whitespace. | `style: reorder tailwind classes in button` |
| **`refactor:`** | Code restructure without changing behavior. | `refactor: move form inputs to dedicated ui folder` |
| **`test:`** | Adding or correcting tests. | `test: add e2e test for signin flow` |
| **`chore:`** | Maintenance tasks, config, dependency updates. | `chore: update next.config and package-lock` |

---

## 6. 🔐 Security & Environment Variables

### 6.1 Environment Variables

* All secrets and environment-specific configurations must be stored in the **`.env.local`** file.
* Access them using `process.env.*`.
* **Never hardcode API keys or secrets directly into the code.**

### 6.2 Sensitive Data

* User API keys must be handled server-side (`src/lib/server/crypto.ts`) and **hashed** before database storage.
* For detailed security practices, refer to **[security.md](./security.md)**.