## Project 

### Explanation

Resume optimization tool that helps people tailor their resumes to a job description.

#### Main Functional Step
1. - The user pastes their resume as JSON and the job description as TEXT.
2. - The system extracts important keywords from the job description.
OR- Send the job description as it is.
3. - An AI model rewrites parts of the resume (summary, experience, skills, etc.) by inserting those keywords.
4. - Instead of auto-overwriting, the tool shows multiple AI suggestions for each section. The user can choose which suggestions to keep, and the tool builds a new tailored resume preview.
5. - Finally, the user can export or copy the optimized resume.

Optional Steps
1. - Can change AI model (Google AI Only)
2. - Can change prompt used to get the Re-Written Resume data ( Some of the prompt remains their like how we want the data and how we are sending data )
3. - Edit basic user Info which we extracted initially ( name, socials, summary, experience[], project[], certificate[], education[], language[], etc. )
4. - User Preference ( Theme )
5. - Change API Key
6. - Change Account Stuff

> Optional Steps can be added in later on the Project

### Structure

```graphql
resume-ai/
├── .github/
│   ├── workflows/
│   │   └── ci.yml                # GitHub Actions for lint/test/build
├── .vscode/
│   └── settings.json             # Editor config (format on save, etc.)
├── prisma/
│   └── schema.prisma             # Prisma schema (users, resumes, etc.)
├── public/
│   └── assets/                   # Static images/icons
├── src/
│   ├── app/
│   │   ├── (auth)/               # Authentication routes
│   │   │   ├── login/            # /login page
│   │   │   └── register/         # (optional if using NextAuth OAuth only)
│   │   ├── dashboard/            # User dashboard (resume builder)
│   │   ├── api/                  # Serverless API routes
│   │   │   ├── auth/             # NextAuth handlers
│   │   │   ├── resume/           # Resume CRUD APIs
│   │   │   └── ai/               # AI endpoints (calls Gemini)
│   │   ├── layout.tsx
│   │   └── page.tsx              # Landing page
│   │
│   ├── components/
│   │   ├── ui/                   # ShadCN + custom UI components
│   │   ├── forms/                # Reusable form components
│   │   ├── layout/               # Navbar, Footer, etc.
│   │   └── resume/               # Resume editor/viewer components
│   │
│   ├── hooks/
│   │   ├── useAuth.ts            # Auth state hook
│   │   ├── useApiKey.ts          # Handle Gemini API key logic
│   │   └── useResume.ts          # Resume state & CRUD
│   │
│   ├── lib/
│   │   ├── prisma.ts             # Prisma client
│   │   ├── auth.ts               # NextAuth config
│   │   ├── validators.ts         # Zod validators (resume JSON, etc.)
│   │   ├── latex.ts              # LaTeX template rendering
│   │   └── utils.ts              # Helpers (formatting, etc.)
│   │
│   ├── ai/
│   │   ├── prompts/              # Prompt templates
│   │   ├── gemini.ts             # Google Gemini client wrapper
│   │   └── resume.ts             # Resume-specific AI logic
│   │
│   ├── data/
│   │   ├── resume-sample.json    # Example resume JSON
│   │   ├── templates/            # LaTeX resume templates
│   │   └── constants.ts          # Role lists, skills categories, etc.
│   │
│   ├── styles/
│   │   ├── globals.css           # Global Tailwind styles
│   │   └── theme.css             # Theme overrides
│   │
│   └── tests/
│       ├── unit/                 # Jest/RTL unit tests
│       ├── integration/          # API tests (resume, AI, etc.)
│       └── e2e/                  # Playwright/Cypress end-to-end tests
│
├── .env                          # Local dev env vars
├── .eslintrc                  # ESLint config
├── .prettierrc                   # Prettier config
├── example.env                  # Example env file
├── jest.config.js                # Jest config
├── playwright.config.ts           # Playwright config (if using)
├── next.config.js                 # Next.js config
├── package.json
├── tsconfig.json                  # TypeScript config
└── vercel.json                    # Vercel deployment settings
```

### Packages Used

