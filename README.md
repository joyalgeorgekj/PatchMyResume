# PatchMyResume - AI-assisted resume tailoring tool

---

## 🚀 How It Works (Data Flow & Handling)

1. **User Input**
    - Resume data (`ResumeUserDataType`) → structured JSON
    - Job description → plain text

2. **Backend**
    - Resume data stored in **Appwrite DB** (per user, tied to their account).
    - **Prisma** used for **development only** (schema + type safety).
    - No custom sections/items (for now) → strictly controlled schema.

3. **AI Integration**
    - Job description processed → keywords extracted.
    - Resume data + keywords → sent to **Google AI (Gemini)**.
    - AI returns multiple rewritten suggestions per section.

4. **User Review**
    - Users choose which AI suggestions to keep.
    - Suggestions update resume preview dynamically.

5. **Export**
    - Final tailored resume preview → export as ATS-optimized format.

---

## 🎨 Design & Styling

### Color System

```
:root {
    /* Primary (brand color) */
    --primary: #e91e63; /* Default (pink, strong brand) */
    --primary-muted: #f48fb1; /* Muted pink */
    --primary-intense: #c2185b; /* Deep/intense pink */

    /* Secondary (complements primary, purple-ish) */
    --secondary: #673ab7;
    --secondary-muted: #b39ddb;
    --secondary-intense: #4527a0;

    /* Accent (contrasts both, teal-ish) */
    --accent: #009688;
    --accent-muted: #80cbc4;
    --accent-intense: #00695c;

    /* Light (backgrounds/text in dark mode) */
    --light: #fafafa;
    --light-muted: #f0f0f0;
    --light-intense: #ffffff;

    /* Dark (text in light mode / dark bg in dark mode) */
    --dark: #212121;
    --dark-muted: #424242;
    --dark-intense: #000000;

    /* UI (borders, dividers, subtle contrast) */
    --ui: #e0e0e0;
    --ui-muted: #eeeeee;
    --ui-intense: #bdbdbd;
}

[data-theme='dark'], .dark {
    /* Primary (brand pink, adjusted for dark bg) */
    --primary: #f06292;
    --primary-muted: #ec407a;
    --primary-intense: #ff80ab;

    /* Secondary (purple adjusted for dark bg) */
    --secondary: #9575cd;
    --secondary-muted: #7e57c2;
    --secondary-intense: #b388ff;

    /* Accent (teal adjusted for dark bg) */
    --accent: #4db6ac;
    --accent-muted: #26a69a;
    --accent-intense: #64ffda;

    /* Light (light gray text on dark bg) */
    --dark: #e0e0e0;
    --dark-muted: #bdbdbd;
    --dark-intense: #ffffff;

    /* Dark (dark bg variants) */
    --light: #121212;
    --light-muted: #1e1e1e;
    --light-intense: #000000;

    /* UI (dividers, subtle borders) */
    --ui: #2c2c2c;
    --ui-muted: #333333;
    --ui-intense: #444444;
}
```

- Using **CSS variables** for themes:
    - `--primary`, `--secondary`, `--accent`, `--light`, `--dark`, `--ui`
- Applied with Tailwind like `bg-primary`, `text-dark-muted`, `border-ui`.
- **No Tailwind default colors** (e.g., `blue-400`).
- **No `dark:` / `light:` classes** → theme handled via vanilla CSS + NextThemes.

### Breakpoints

```
--breakpoint-mobile: 360px
--breakpoint-tablet: 768px
--breakpoint-laptop: 1280px
--breakpoint-desktop: 1920px
--breakpoint-tv: 2560px
```

- Custom breakpoints only (not Tailwind defaults).

### Tailwind Rules

- Defaults applied to `input`, `textarea`, `select` with `@apply`.
- Custom dropdown arrow, hidden `details` markers.
- Minimal, professional, consistent look.

---

## 📊 Resume Data Structure

```ts
export interface ResumeUserDataType {
    name: string;
    email: string;
    phone: string;
    location: string;
    links: {
        publisher:
            | 'github'
            | 'linkedin'
            | 'portfolio'
            | 'twitter'
            | 'dribbble'
            | 'behance'
            | 'other';
        url: string;
    }[];
    skills: string[];
    experience: {
        company: string;
        title: string;
        location: string;
        startDate: Date;
        endDate?: Date | 'present';
        workType: 'regular' | 'freelance' | 'volunteer';
        description: string;
    }[];
    education: {
        institute: string;
        course: string;
        location: string;
        grade?: {
            value: string;
            scale?: 'GPA' | 'Percentage' | 'CGPA' | 'Other';
        };
        startDate: Date;
        endDate?: Date | 'present';
    }[];
    language: {
        language: string;
        proficiency: 'native' | 'fluent' | 'professional' | 'intermediate' | 'basic';
    }[];
    summary?: string;
    project?: {
        name: string;
        type: 'personal' | 'academic' | 'professional' | 'open-source';
        code_link: string;
        preview_link: string;
        tech_stack: string[];
        description: string;
    }[];
    achievement?: {
        type: 'certificate' | 'award' | 'publication' | 'honor' | 'scholarship' | 'other';
        description: string;
        url: string;
        name: string;
        issuer: string;
        date?: Date;
    }[];
}
```

- **Dates** stored as separate fields: `startDate`, `endDate`.
- **Descriptions** accept inline bullet points with `\n- ` for AI + ATS parsing.
- **No custom sections/items** — only predefined fields (future feature).

---

## 🧭 UI/UX, SEO, Security, Best Practices

### UI/UX

- ATS-first, minimal design.
- No unnecessary sections (e.g., hobbies, interests).
- Users can edit structured fields & optional free text.
- Always-preview-before-export approach.

### SEO

- Proper `<form>` semantics + `<label>` usage.
- Optimized meta tags, OpenGraph, sitemap.
- Goal: rank even on subdomains (community-focused).

### Security

- Appwrite handles authentication & database storage.
- NextAuth for session management.
- API keys **hashed & stored securely** (never exposed).
- Validation everywhere (even non-critical fields).
- Fake session check with IP binding.

### Best Practices

- No rate limiting (users provide their own API keys).
- AI prompt sanitization not required (user-owned keys).
- Consistent error handling with toasts + inline messages.

---

## 📂 Project Structure

- ai suggestion API Route returns Suggestion Type

```
src
├── app
│   ├── api
│   │   ├── ai
│   │   │   └── suggestions
│   │   │       └── route.ts
```

- crud appwrite db

```
src
├── app
│   │   ├── appwrite
│   │   │   └── resume
│   │   │       └── route.ts
```

- signin route

```
src
├── app
│   │   └── auth
│   │       └── [...nextauth]
│   │           └── route.ts
```

- signin route and user routes

```
src
├── app
│   ├── (auth)
```

- form elements like button, steppers, editors forms, etc.

```
src
├── components
│   ├── forms
│   │   ├── AuthButton.tsx
│   │   ├── JsonEditor.tsx
│   │   ├── ResumeForm.tsx
│   │   └── stepper
│   │       ├── Main.tsx
│   │       ├── StepAiSuggestions.tsx
│   │       ├── StepApiModel.tsx
│   │       ├── StepFinalPreview.tsx
│   │       ├── StepJobDescription.tsx
│   │       └── StepResumeData.tsx
```

- layout common components

```
src
├── components
│   ├── layout
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   └── ThemeButton.tsx
```

- common components for main routes

```
src
├── components
│   └── ui
│       ├── Auth
│       │   ├── ProfileAvatar.tsx
│       │   └── ToHome.tsx
│       └── landing
│           ├── Feature.tsx
│           ├── HowItWorks.tsx
│           ├── LandingWrapper.tsx
│           └── Main.tsx
```

- context and its style

```
src
├── context
│   └── UIContext.tsx
```

- constant datas like prompt, models, example content like Resume data and Job Description, etc.

```
│   ├── data
│   │   ├── constants
│   │   │   ├── types.ts
│   │   │   └── workflow.ts
│   │   ├── examples
│   │   │   ├── jobDescription.ts
│   │   │   └── resume.ts
│   │   ├── prompts
│   │   │   └── atsPrompt.ts
│   │   └── templates
```

- custom hooks

```
src
├── hooks
│   └── useHiddenRoutes.tsx
```

- fucntions common and used in client and server, crypto (encrypt, decrypt) is only used in server and the other 2 used on client to fetch result from its route.

```
src
├── lib
│   ├── ai.ts
│   ├── appwrite.ts
│   └── server
│       └── crypto.ts
```

- test cases: not yet added.

```
src
├── tests
│   ├── e2e
│   ├── integration
│   └── unit
```

- change in package types from npm library

```
src
└── types
    └── next-auth.d.ts
```

- styles

```
src
├── style.css

```

---

## ⚙️ Tech Stack

- **Framework**: Next.js (App Router)
- **Database/Auth**: Appwrite
- **Auth**: NextAuth
- **Theme**: NextThemes
- **AI**: Google AI API (Gemini)
- **Testing**: Jest + Playwright
- **Deployment**: Vercel
- **Dev Tooling**: Prisma (development only)
- **Styling**: TailwindCSS (with custom rules, no external component libraries)

---

## 📌 Roadmap

- [x] Resume import/export (JSON → ATS-ready)
- [x] AI rewriting (Gemini)
- [x] Multiple AI suggestions per section
- [x] User-controlled preview builder
- [x] Theming (light/dark/system)
- [ ] Future: Custom sections/items
- [ ] Future: More AI model support
- [ ] Future: Resume template library

---

## 📝 License

Community-focused, free to use and extend. License TBD.
