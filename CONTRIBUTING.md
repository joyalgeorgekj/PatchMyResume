# 📄 PatchMyResume: Developer Style Guide & Contribution Rules

This document outlines the coding standards, file conventions, and contribution process for the **PatchMyResume** project. Adhering to these guidelines ensures code quality, consistency, and maintainability across the entire codebase.

---

## 🗺️ Table of Contents

1.  [🛠️ Tools & Environment](#tools-environment)
2.  [📂 File Structure & Naming](#file-structure-naming)
3.  [✍️ Code Style & Conventions](#code-style-conventions)
4.  [🎨 Styling Conventions (TailwindCSS)](#styling-conventions-tailwindcss)
5.  [🔄 Contribution Workflow & Commits](#contribution-workflow-commits)
6.  [🔐 Security & Environment Variables](#security-environment-variables)
7.  [📂 Project Structure](#project-structure)

---

## IMPORTANT 

- Before working on an Issue 
    - Make sure to **check for anyother PR submited solving the Issue**.
    - Make sure to ask in that Issue comment to **assign it to you**.
    - **Assignees can be changed** if no progress was found in solving it.
- **Follow the rules below** to get better understanding of the project.

<a name="tools-environment" id="tools-environment"></a>

## 1. 🛠️ Tools & Environment

### 1.1 Language

- **Framework:** Next JS with Tailwind CSS.
- **Storage:** Appwrite and Upstash Redis.
- **TypeScript (TS/TSX):** All code must be written in TypeScript for type safety and better tooling.
- **Test:** Jest and playwright.

### 1.2 Formatting & Linting

- **Prettier:** Use Prettier for consistent code formatting. The project root contains the configuration (`.prettierrc`).
- **Linting:** Follow the linting rules enforced by the project setup.

---

<a name="file-structure-naming" id="file-structure-naming"></a>

## 2. 📂 File Structure & Naming

### 2.1 Directory Structure

- All application logic must reside within the **`src/`** directory.
- We strictly follow the **Next.js App Router** conventions.
    - **Pages & Layouts:** Located in `src/app/`.
    - **API Routes:** Located in `src/app/api/`.

### 2.2 File Naming Conventions

| Component/File Type            | Convention     | Example                                  |
| :----------------------------- | :------------- | :--------------------------------------- |
| **React Components** (JSX/TSX) | **PascalCase** | `AuthButton.tsx`, `StepFinalPreview.tsx` |
| **Route/Segment Folders**      | **lowercase**  | `src/app/auth/login/`                    |
| **API Route Files**            | `route.ts`     | `src/app/api/ai/suggestions/route.ts`    |
| **Config/Tooling Files**       | **camelCase**  | `crypto.ts`, `pdfHelpers.ts`             |

### 2.3 Imports

- Use **Absolute Imports** for all local modules (configured via `@` alias).

    ```typescript
    // ✅ Correct: Absolute Import
    import AuthButton from '@/components/forms/AuthButton';
    import { ResumeUserDataType } from '@/data/constants/types';

    // ❌ Incorrect: Relative Import
    // import AuthButton from "../../components/forms/AuthButton";
    ```

- **Grouping:** Organize imports into distinct blocks with a newline separator:
    1.  Libraries (React, Next, NextAuth, Appwrite, etc.)
    2.  Local Components
    3.  Local Utilities/Types (Hooks, Libs, Data, Styles)

---

<a name="code-style-conventions" id="code-style-conventions"></a>

## 3. ✍️ Code Style & Conventions

### 3.1 JavaScript/TypeScript Basics

- **Variables:** Use `const` by default. Only use `let` when a variable must be reassigned. **Avoid** `var`.
- **Functions:** Prefer **Arrow Functions** for components and callbacks.
    ```tsx
    const MyComponent = () => {
        /* ... */
    };
    const handleClick = (e: React.MouseEvent) => {
        /* ... */
    };
    ```
- **Props:** Always **destructure props** in the function parameter list for clarity.

    ```tsx
    // ✅ Correct
    const AuthButton = ({ label, Icon, handleLogin }: Props) => {
        /* ... */
    };

    // ❌ Incorrect
    const AuthButton = (props: Props) => {
        console.log(props.label); /* ... */
    };
    ```

### 3.2 Components

- **Modularity:** Components should be small, focused, and highly reusable.
- **Location:**
    - **Reusable UI** goes in `src/components/ui/` (e.g., `Input.tsx`, `Select.tsx`).
    - **App-Specific Logic/Forms** go in `src/components/forms/` (e.g., `ResumeForm.tsx`).

### 3.3 Error Handling

- **Async Calls:** Always wrap asynchronous operations (API calls, database interactions, etc.) in a `try...catch` block.
- **User Feedback:** Show user-friendly error messages (e.g., using toast notifications) while logging detailed errors to the console.

### 3.4 Authentication

- Authentication is managed by **NextAuth**.
- The primary authentication API route is located at: `src/app/api/auth/[...nextauth]/route.ts`.

---

<a name="styling-conventions-tailwindcss" id="styling-conventions-tailwindcss"></a>

## 4. 🎨 Styling Conventions (TailwindCSS)

### 4.1 Custom Theme Colors

- **Do NOT** use Tailwind's default color classes (e.g., `bg-blue-500`).
- **ALWAYS** use the custom CSS variables defined in the global styles (e.g., `text-primary`, `bg-dark-muted`, `border-ui`).

### 4.2 Class Ordering

- Maintain a **consistent order** for Tailwind utility classes in the `className` attribute (Automated using formatter `npm run prettier:src`).
- **Recommended Order:**
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
    className =
        'flex items-center gap-2 rounded-xl px-4 py-2 text-base font-medium bg-primary hover:bg-primary-intense shadow transition';
    ```

### 4.3 Theming

- **Do NOT** use Tailwind's built-in `dark:` prefix.
- Theming (light/dark) is handled globally via CSS variables and the `[data-theme='dark']` selector (managed by `NextThemes`).

---

<a name="contribution-workflow-commits" id="contribution-workflow-commits"></a>

## 5. 🔄 Contribution Workflow & Commits

### 5.1 Branching

- All new features and fixes should be developed in separate, feature-specific branches (e.g., `feat/add-template-selection`, `fix/api-key-hashing`).

### 5.2 Conventional Commits

- We enforce **Conventional PR Title** for clear and readable history.
- The title must start with a type, followed by a colon and a space:

| Type               | Description                                             | Example                                             |
| :----------------- | :------------------------------------------------------ | :-------------------------------------------------- |
| **`[FEAT]: `**     | A new feature or major addition.                        | `feat: implement PDF-LIB for export`                |
| **`[FIX]: `**      | A bug fix.                                              | `fix: correct Appwrite response handling`           |
| **`[DOC]: `**      | Changes to documentation only.                          | `docs: update README with new section`              |
| **`[AI]: `**       | Changes to AI model logic, prompts, or model selection. | `ai: refine ATS prompt for better keyword matching` |
| **`[UI/UX]: `**    | Formatting, missing semi-colons, whitespace.            | `UI/UX: reorder tailwind classes in button`         |
| **`[REFACTOR]: `** | Code restructure without changing behavior.             | `refactor: move form inputs to dedicated ui folder` |
| **`[TEST]: `**     | Adding or correcting tests.                             | `test: add e2e test for signin flow`                |
| **`[CHORE]: `**    | Maintenance tasks, config, dependency updates.          | `chore: update next.config and package-lock`        |

---

<a name="security-environment-variables" id="security-environment-variables"></a>

## 6. 🔐 Security & Environment Variables

### 6.1 Environment Variables

- All secrets and environment-specific configurations must be stored in the **`.env.local`** file.
- Access them using `process.env.*`.
- **Never hardcode API keys or secrets directly into the code.**

### 6.2 Sensitive Data

- User API keys must be handled server-side (`src/lib/server/crypto.ts`) and **hashed** before database storage.
- For detailed security practices, refer to the **[Security Policy](./security.md)** and report vulnerabilities using the **private reporting channel** (Security tab $\rightarrow$ Report a vulnerability).

---

<a name="project-structure" id="project-structure"></a>

## 7. 📂 Project Structure

The project follows a clean, module-based structure using the Next.js App Router.
This directory structure follows best practices for the Next.js App Router, separating concerns into clear domains (API, UI components, data, and utilities).

### 7.1 app/ (Next.js Application Root)

This is the primary directory for defining all routes, pages, and shared layouts using the Next.js App Router convention.

| Path                                  | Type   | Description                                                                                                                                                                           |
| ------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/api/`                            | Folder | Contains all server-side API routes (Next.js route handlers).                                                                                                                         |
| `app/api/ai/suggestions/route.ts`     | File   | **AI Suggestion Endpoint.** Handles `POST` requests to generate resume content suggestions (e.g., better bullet points) using an LLM.                                                 |
| `app/api/appwrite/resume/route.ts`    | File   | **Appwrite Data Endpoint.** API for CRUD (Create, Read, Update, Delete) operations on resume data stored in the Appwrite backend.                                                     |
| `app/api/auth/[...nextauth]/route.ts` | File   | **NextAuth Handler.** The catch-all route that handles all authentication requests (sign-in, sign-out, callbacks, session).                                                           |
| `app/(auth)/`                         | Folder | A **Route Group** (indicated by `()`) containing authentication-related pages, allowing them to share a distinct layout (if defined) or prevent them from inheriting the main layout. |
| `app/(auth)/signin/page.tsx`          | File   | The dedicated sign-in page component.                                                                                                                                                 |
| `app/(auth)/user/page.tsx`            | File   | A page for viewing/managing the authenticated user's profile or account details.                                                                                                      |
| `app/globals.css`                     | File   | Global CSS file, typically used to import Tailwind CSS directives and set custom base styles.                                                                                         |
| `app/icon.ico`                        | File   | The application's favicon.                                                                                                                                                            |
| `app/layout.tsx`                      | File   | The **Root Layout** for the entire application. It wraps all pages and includes necessary components like the header/footer, Context Providers, and the HTML structure.               |
| `app/page.tsx`                        | File   | The main application homepage or landing page (`/`).                                                                                                                                  |

### 7.2 assets/

Storage for static assets like images, often imported directly into components.

| Path                      | Type | Description                                            |
| ------------------------- | ---- | ------------------------------------------------------ |
| `assets/images/dark.png`  | File | Image asset used for the dark theme logo or branding.  |
| `assets/images/light.png` | File | Image asset used for the light theme logo or branding. |

### 7.3 components/

Reusable UI building blocks, often divided into functional categories.

| Path                             | Type   | Description                                                                                               |
| -------------------------------- | ------ | --------------------------------------------------------------------------------------------------------- |
| `components/forms/`              | Folder | Components related to the primary resume data entry and processing forms.                                 |
| `forms/AuthButton.tsx`           | File   | Button component for initiating authentication actions (e.g., "Sign In").                                 |
| `forms/JsonEditor.tsx`           | File   | Component for advanced users to view and edit the raw JSON structure of the resume data.                  |
| `forms/ResumeForm.tsx`           | File   | The high-level wrapper component for the entire resume creation form.                                     |
| `forms/stepper/`                 | Folder | Components that define the multi-step user flow for resume generation.                                    |
| `stepper/Main.tsx`               | File   | The controller component for the stepper, managing state, step flow, and navigation.                      |
| `stepper/StepAiSuggestions.tsx`  | File   | UI for the step where the user reviews and accepts/rejects AI-generated content suggestions.              |
| `stepper/StepApiModel.tsx`       | File   | UI for the step where the user configures AI parameters or selects the model/prompt goals.                |
| `stepper/StepFinalPreview.tsx`   | File   | UI for the final step where the generated resume is displayed for review and export.                      |
| `stepper/StepJobDescription.tsx` | File   | UI for the step where the user inputs the job description to be targeted for ATS optimization.            |
| `stepper/StepResumeData.tsx`     | File   | UI for the step dedicated to structured data entry (personal details, experience, etc.).                  |
| `components/layout/`             | Folder | Components defining the structural frame of the application.                                              |
| `layout/Footer.tsx`              | File   | The application footer component.                                                                         |
| `layout/Header.tsx`              | File   | The main application navigation bar/header.                                                               |
| `layout/ThemeButton.tsx`         | File   | Button/toggle for switching between light and dark themes.                                                |
| `components/resume/`             | Folder | Components responsible for rendering the visual, output version of the resume (e.g., different sections). |
| `components/ui/`                 | Folder | Generic, primitive UI components (e.g., buttons, cards, wrappers).                                        |
| `ui/auth/ProfileAvatar.tsx`      | File   | Displays the current user's avatar or initials.                                                           |
| `ui/auth/ToHome.tsx`             | File   | A simple link or button to navigate back to the homepage.                                                 |
| `ui/form/ArrayInput.tsx`         | File   | Component for managing dynamic lists of items (e.g., skills, project features, bullet points).            |
| `ui/form/DatePicker.tsx`         | File   | Reusable component for selecting dates.                                                                   |
| `ui/form/Input.tsx`              | File   | Reusable wrapper for standard text/number inputs.                                                         |
| `ui/form/Select.tsx`             | File   | Reusable dropdown selection component.                                                                    |
| `ui/form/Textarea.tsx`           | File   | Reusable multi-line text input component.                                                                 |
| `ui/landing/`                    | Folder | Components specific to the marketing/home page.                                                           |
| `ui/landing/Feature.tsx`         | File   | Component describing a single selling point or feature.                                                   |
| `ui/landing/HowItWorks.tsx`      | File   | Explains the step-by-step process of using the application.                                               |
| `ui/landing/LandingWrapper.tsx`  | File   | Layout wrapper for landing page sections.                                                                 |
| `ui/landing/Main.tsx`            | File   | The primary content component for the landing page.                                                       |

### 7.4 context/

React Context files for global, stateful data.

| Path                      | Type | Description                                                                   |
| ------------------------- | ---- | ----------------------------------------------------------------------------- |
| `context/UIContext.tsx`   | File | Context for global UI state (theme, notifications, modal status, etc.).       |
| `context/UserContext.tsx` | File | Context for managing and accessing the authenticated user's data and session. |

### 7.5 data/

Stores configuration, static content, and templates that drive the application's logic.

| Path                         | Type   | Description                                                                                                                                     |
| ---------------------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `data/constants/types.ts`    | File   | TypeScript type definitions for application-wide objects (e.g., `IResumeData`, `IWorfklowStep`).                                                |
| `data/constants/workflow.ts` | File   | Definitions for the stepper workflow stages, titles, and routing logic.                                                                         |
| `data/examples/`             | Folder | Mock data for development and testing purposes.                                                                                                 |
| `examples/jobDescription.ts` | File   | Example JSON/string of a job description.                                                                                                       |
| `examples/resume.ts`         | File   | Example complete JSON resume data.                                                                                                              |
| `examples/suggestion.ts`     | File   | Example JSON data structure for AI suggestions.                                                                                                 |
| `data/prompts/atsPrompt.ts`  | File   | **LLM Prompt Definition.** Contains the carefully engineered prompt template used to instruct the AI to perform ATS-optimization on the resume. |
| `data/templates/`            | Folder | Code and styling definitions for different resume visual layouts.                                                                               |
| `templates/index.ts`         | File   | Exporting file for all available templates.                                                                                                     |
| `templates/modern.ts`        | File   | The structural definition for the "modern" resume layout.                                                                                       |
| `templates/styles.ts`        | File   | Centralized style variables (colors, fonts, margins) used by the resume templates.                                                              |

### 7.6 hooks/

Custom React Hooks for abstracting component logic.

| Path                        | Type | Description                                                                                                                                                                      |
| --------------------------- | ---- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `hooks/useHiddenRoutes.tsx` | File | Custom hook likely used to determine if the current route is one that should hide standard layout elements (like the header/footer), common for full-screen steps or auth pages. |

### 7.7 lib/ (Utilities and Service Wrappers)

Code for interacting with external services and shared utility functions.

| Path                    | Type   | Description                                                                                                    |
| ----------------------- | ------ | -------------------------------------------------------------------------------------------------------------- |
| `lib/ai.ts`             | File   | Client-side utilities for calling the `/api/ai` endpoints.                                                     |
| `lib/appwrite.ts`       | File   | Client-side utilities for interacting with the Appwrite SDK.                                                   |
| `lib/pdfHelpers.ts`     | File   | Functions dedicated to generating the final PDF document from the rendered HTML/React resume.                  |
| `lib/template.ts`       | File   | Utility functions for selecting, manipulating, and rendering resume data based on a chosen template.           |
| `lib/server/`           | Folder | Utilities designed specifically to run only in a server environment (Next.js API routes or server components). |
| `server/appwrite.ts`    | File   | Server-side Appwrite SDK setup (potentially using admin credentials).                                          |
| `server/crypto.ts`      | File   | Server-side utilities for secure operations (encryption, hashing, UUID generation).                            |
| `server/rateLimiter.ts` | File   | Middleware or function to implement rate limiting on API requests to prevent abuse, especially for AI calls.   |
| `server/redis.ts`       | File   | Client/utilities for connecting to and interacting with a Redis cache (likely used by the rate limiter).       |
| `server/response.ts`    | File   | Helper functions for creating standardized, clean API responses.                                               |

### 7.8 styles/

| Path                 | Type | Description                                                                              |
| -------------------- | ---- | ---------------------------------------------------------------------------------------- |
| `styles/context.css` | File | Additional CSS specific to certain contexts or components, outside of the global styles. |

### 7.9 tests/

| Path                 | Type   | Description                                                                                                  |
| -------------------- | ------ | ------------------------------------------------------------------------------------------------------------ |
| `tests/e2e/`         | Folder | End-to-End tests (e.g., simulating a user signing up and generating a resume).                               |
| `tests/integration/` | Folder | Tests focusing on the interaction between multiple units (e.g., how the form state updates the JSON editor). |
| `tests/unit/`        | Folder | Tests for individual functions and components in isolation (e.g., testing `pdfHelpers` functions).           |

### 7.10 types/

| Path                   | Type | Description                                                                                                    |
| ---------------------- | ---- | -------------------------------------------------------------------------------------------------------------- |
| `types/next-auth.d.ts` | File | TypeScript declaration file used to extend the NextAuth.js types to include custom user or session properties. |
