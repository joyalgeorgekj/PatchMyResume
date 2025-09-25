<p align="center">
  <a href="https://patchmyresume.joyalgeorgekj.com" target="_blank">
    <img src="./public/image/banner.png" width="830px" height="290px" alt="PatchMyResume banner, with logo and text saying 'AI-Assisted and ATS Friendly'">
  </a>
</p>

<h1 style="text-align: center;">
PatchMyResume
</h1>
<p style="text-align: center;">
<span style="font-weight: 500; font-size: 20px;">AI-assisted, ATS-friendly resume builder.</span>  <br>
Tailor your resume to specific job descriptions with the power of Google Gemini AI — you stay in control by choosing which AI suggestions to keep.
</P>

---

## 🗺️ Table of Contents

1.  [🚀 Features & How It Works](#-features--how-it-works)
2.  [🧑‍💻 Getting Started (Installation)](#-getting-started-installation)
3.  [🛠️ Tech Stack](#-tech-stack)
4.  [🤝 Contribution & Guidance](#-contribution--guidance)
5.  [🔒 Security & Data Handling](#-security--data-handling)
6.  [📂 Project Structure](#-project-structure)
7.  [📌 Roadmap](#-roadmap)
8.  [📝 License](#-license)

---

## 🚀 Features & How It Works

PatchMyResume focuses on leveraging AI to create perfectly tailored resumes, maximizing your chances against Applicant Tracking Systems (ATS).

### Key Features

* **AI-Driven Tailoring:** Uses **Google Gemini** to analyze job descriptions and rewrite your resume sections for keyword matching and relevance.
* **ATS-Optimized Export:** Generates clean, structured PDF resumes that are easily parsed by ATS software using **PDF-LIB**.
* **Structured Data First:** Collects data using a strict, predefined schema to ensure consistency and quality.
* **User-Owned AI:** You provide your own API key, giving you control over usage and ensuring your data privacy.
* **Theming:** Full **Light/Dark** mode support powered by NextThemes.

### How It Works (The Workflow)

1.  **API Key/Model Setup:** You securely provide your Gemini API Key and select your preferred model.
2.  **Input:** You provide your structured **Resume Data** and the target **Job Description**.
3.  **AI Processing:** Your data and the job description are sent to the **Google AI (Gemini)** model. Keywords are extracted, and multiple rewritten suggestions are generated for relevant sections (like experience descriptions).
4.  **User Review:** You review the AI suggestions and dynamically choose which ones to apply to your resume.
5.  **Export:** The final, tailored resume is exported as a clean, **ATS-friendly PDF**.

---

## 🧑‍💻 Getting Started (Installation)

Ready to start patching? Follow these steps to set up the project locally.

### Prerequisites

You'll need the following installed:

* **Node.js** (v18.x or later)
* **npm** or **yarn**
* An **Appwrite** instance (Local or Cloud)
* A **Google Gemini API Key** (for development/testing the AI feature)

### Step-by-Step Setup

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/your-username/patchmyresume.git](https://github.com/your-username/patchmyresume.git)
    cd patchmyresume
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set Up Environment Variables:** 

    Create a file named `.env` in the root directory and populate it with your credentials. (Refernce `example.env`)

    *Note: Appwrite setup is required. Refer to the Appwrite docs for schema details matching the `ResumeUserDataType`.*

4.  **Run the Development Server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

    Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

---

## 🛠️ Tech Stack

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | **Next.js** (App Router) | React framework for routing and server components. |
| **AI** | **Google AI API (Gemini)** | Core engine for resume rewriting and tailoring. |
| **Database/Auth** | **Appwrite** | Backend for user and structured resume data storage. |
| **Auth** | **NextAuth** | Session management and authentication layer. |
| **Styling** | **TailwindCSS** | Utility-first CSS framework (Customized). |
| **PDF Generation** | **PDF-LIB** | Generating clean, ATS-friendly PDF documents. |
| **Language** | **TypeScript** | Statically typed codebase for better stability. |
| **Testing** | **Jest** + **Playwright** | Unit, integration, and end-to-end testing. |
| **Theming** | **NextThemes** | Seamless light/dark mode implementation. |
| **Tooling** | **ZOD, Prettier, VS Code** | Schema validation, code formatting, and development environment. |

---

## 🤝 Contribution & Guidance

We're excited to welcome contributions! Whether you're fixing a bug, suggesting a new feature, or improving documentation, your help is valued.

### Contribution Guidelines

Please read our detailed **[patchmyresume.md](./patchmyresume.md)** for:

* Detailed project philosophy and goals.
* Instructions for setting up your development environment.
* Specific conventions for code, commits, and pull requests.

### Quick Start Guide for Developers

1.  **Coding Style:** We strictly follow **TypeScript** and use **Prettier** for formatting. Ensure your code is formatted before committing.
2.  **Design System:**
    * **No Tailwind Default Colors:** Stick to the predefined **CSS Variables** (e.g., `--primary`, `--secondary`).
    * **No `dark:` classes:** Theming is handled globally via vanilla CSS variables and the `[data-theme='dark']` selector.
3.  **Testing:** We use `jest.config.js` for unit/integration tests and `playwright.config.js` for E2E tests. New features should include relevant test cases.

---

## 🔒 Security & Data Handling

We prioritize user security and data privacy. For detailed security policies and vulnerability reporting, please see **[security.md](./security.md)**.

### Security Principles

* **API Key Protection:** The user's provided Gemini API key is **hashed** (`src/lib/server/crypto.ts`) and stored securely. It is only used server-side (`src/lib/server/appwrite.ts`).
* **User-Owned Key:** Users are responsible for their own API usage. This is a deliberate design choice for security and cost control.
* **Authentication:** Robust session management via **NextAuth** and dedicated user routes (`src/app/(auth)/user/page.tsx`).

### Data Flow & Storage

| Data Point | Storage Location | Sharing Policy | Notes |
| :--- | :--- | :--- | :--- |
| **User Resume Data** | Appwrite DB & Session Storage | **Private** | Stored securely, accessible only by the logged-in user. |
| **User API Key (Gemini)** | Appwrite DB (Hashed) | **Private** | Hashed and used server-side only to access the Gemini API. |
| **Job Description** | Session/Local | **Not Saved** | Used temporarily for a single AI tailoring request. |
| **AI Suggestions** | Session/Local | **Not Saved** | Discarded after the user makes their selection/moves on. |
| **Final PDF Resume** | Local User Device | **Not Stored** | Generated client-side (`src/lib/pdfHelpers.ts`) and never stored on our servers. |

---

## 📂 Project Structure

The project follows a clean, module-based structure using the Next.js App Router.

````

├── .gitignore
├── jest.config.js                  \# Jest configuration for unit/integration tests
├── LICENSE
├── next.config.ts
├── package.json
├── playwright.config.js            \# Playwright configuration for E2E tests
├── public                          \# Static assets (images, icons)
│   └── image
│       ├── banner.png              \# Project banner
├── README.md
├── security.md                     \# Detailed security policy and reporting guide
├── src
│   ├── app                         \# Next.js App Router root
│   │   ├── api                     \# API Routes
│   │   │   ├── ai/.../route.ts     \# AI suggestions endpoint
│   │   │   ├── appwrite/.../route.ts \# Resume CRUD endpoint
│   │   │   └── auth/.../route.ts   \# NextAuth catch-all route
│   │   ├── (auth)                  \# Grouped authentication routes
│   │   │   ├── signin/page.tsx     \# Sign-in page
│   │   │   └── user/page.tsx       \# User profile/dashboard page
│   │   ├── globals.css             \# Global styles and Tailwind imports
│   │   └── page.tsx                \# Home/Landing page
│   ├── components
│   │   ├── forms                   \# Main form logic and components
│   │   │   └── stepper             \# Core workflow components (steps)
│   │   ├── layout                  \# Header, Footer, and common layout
│   │   ├── resume                  \# Components for rendering the resume preview
│   │   └── ui                      \# General UI elements
│   │       ├── auth                \# Auth-related UI (ProfileAvatar, ToHome)
│   │       └── form                \# Reusable form elements (Input, Select, DatePicker)
│   │       └── landing             \# Landing page components
│   ├── context                     \# React Contexts
│   │   ├── UIContext.tsx           \# UI state, theme, and toast management
│   │   └── UserContext.tsx         \# User state and data
│   ├── data                        \# Static data, constants, and AI prompts
│   │   ├── constants/...           \# Types and workflow configurations
│   │   ├── examples/...            \# Sample data for development/demo
│   │   ├── prompts/atsPrompt.ts    \# The prompt template for Gemini
│   │   └── templates               \# Resume PDF template structure
│   ├── hooks                       \# Custom React hooks
│   ├── lib                         \# Utility functions
│   │   ├── ai.ts                   \# Client-side AI utilities
│   │   ├── appwrite.ts             \# Client-side Appwrite utilities
│   │   ├── pdfHelpers.ts           \# Functions for PDF creation with PDF-LIB
│   │   ├── server                  \# Server-only utilities
│   │   │   └── crypto.ts           \# API key hashing/decryption
│   │   └── template.ts             \# Template selection and data mapping logic
│   ├── styles/context.css          \# Context-specific styles (e.g., custom CSS variables)
│   ├── tests                       \# Placeholder for all test types
│   └── types                       \# Type definitions


````

---

## 📌 Roadmap

This project is actively maintained. Here's a look at what's complete and what's next.

### Completed (v1.0 Launch)

* [x] Resume import/export (JSON $\to$ ATS-ready PDF)
* [x] AI rewriting and tailoring (Google Gemini)
* [x] Multiple AI suggestions per section for user choice
* [x] User-controlled, dynamic resume preview builder
* [x] Theming (light/dark/system)

### Future Development

* [ ] **Custom Sections/Items:** Allow users to define their own resume sections (e.g., certifications, publications) beyond the strict schema.
* [ ] **More AI Model Support:** Integrate other LLM providers (e.g., OpenAI, Claude) for user choice.
* [ ] **Resume Template Library:** Provide a selection of professional resume design templates.
* [ ] **Testing Implementation:** Full coverage with Jest (`src/tests/unit`, `integration`) and Playwright (`src/tests/e2e`).

---

## 📝 License

This project is open-source and community-focused. You are free to use and extend it under the **MIT License**.