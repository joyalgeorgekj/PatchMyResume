# PatchMyResume – Style Guide

## 1. Project Structure
- Use `src/` directory for all code.
- Follow **App Router** convention (`src/app/...`).
- Keep components in `src/components/` with clear naming.
- API routes inside `src/app/api/...`.

---

## 2. File Naming
- Use **camelCase** for files inside `components/`.
  - Example: `authButton.tsx`
- Use **lowercase** with dashes for route segments.
  - Example: `src/app/auth/login/page.tsx`
- Use **PascalCase** for React components.
  - Example: `AuthButton.tsx`

---

## 3. Code Style
- Always use **TypeScript**.
- Prefer `const` over `let`.
- Use **arrow functions** for components and callbacks.
  ```tsx
    const AuthButton = () => { ... }
  ```
- Destructure props in function parameters.

  ```tsx
    const AuthButton = ({ label, Icon, handleLogin }: Props) => { ... }
  ```

---

## 4. Authentication Flow

* Authentication providers handled via `next-auth`.
* API routes for auth must follow:

  ```
  src/app/api/auth/[...nextauth]/route.ts
  ```
* Redirect URIs: `/api/auth/callback/{provider}`

---

## 5. Styling

* Use **TailwindCSS** for styling.
* Keep utility classes in JSX, avoid inline `style={{}}`.
* Use `className="..."` with **consistent order**:

  1. Layout → Spacing → Border → Typography → Color → Effects

  ```tsx
  className="flex items-center gap-2 rounded-xl px-4 py-2 text-base font-medium bg-surface hover:bg-surface/80 shadow"
  ```

---

## 6. Components

* **Reusable components** go in `src/components/`.
* Components should be:

  * Small
  * Self-contained
  * Reusable

---

## 7. Imports

* Use **absolute imports** (with `@` alias).

  ```tsx
  import AuthButton from "@/components/AuthButton";
  ```
* Group imports:

  1. Libraries
  2. Local components
  3. Styles / types

---

## 8. Commit Rules

* Use **conventional commits**:

  * `feat:` → new feature
  * `fix:` → bug fix
  * `docs:` → documentation
  * `refactor:` → code restructure
  * `style:` → formatting only

---

## 9. Error Handling

* Always handle async calls with `try/catch`.
* Show user-friendly messages, log details in console.

---

## 10. Environment Variables

* All secrets go in `.env`
* Access with `process.env.*`
* Never hardcode API keys in code.

---