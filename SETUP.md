## SkillSense AI - Setup Guide

This document provides step-by-step instructions for setting up the development environment.

### Prerequisites

- **Node.js**: v18.17.0 or later
- **npm**: v9.0.0 or later (comes with Node.js)
- **Git**: For version control

Verify your versions:

```bash
node --version
npm --version
```

### Installation Steps

#### 1. Navigate to the project directory

```bash
cd path/to/SkillSense
```

#### 2. Install dependencies

```bash
npm install
```

This will install all packages from `package.json`:

- **Next.js 14**: React framework with App Router
- **React 18**: UI library
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui Components**: Pre-built UI components
- **Lucide React**: Icon library
- **React Hook Form**: Form management
- **Zod**: Schema validation

#### 3. Verify the installation

```bash
npm run type-check
```

This runs TypeScript compiler to ensure no type errors. You should see no errors in the output.

#### 4. Start the development server

```bash
npm run dev
```

The terminal will display:

```
> next dev
  ▲ Next.js 14.0.0
  - Local: http://localhost:3000
  - Environments: .env.local
```

#### 5. Open in browser

Visit **http://localhost:3000** in your browser. You should see:

- SkillSense AI logo and branding in the navbar
- Dashboard layout with sidebar navigation
- Welcome message and stat cards
- Recent analyses section
- Match score chart placeholder

### Troubleshooting

#### Issue: Port 3000 already in use

```bash
npm run dev -- -p 3001
```

#### Issue: Node modules not properly installed

```bash
rm -r node_modules package-lock.json
npm install
```

#### Issue: TypeScript errors

```bash
npm run type-check
```

### Project Structure After Installation

```
SkillSense/
├── .github/
│   └── copilot-instructions.md    # AI agent instructions
├── app/
│   ├── layout.tsx                 # Root layout
│   ├── globals.css               # Tailwind setup
│   └── dashboard/
│       └── page.tsx              # Dashboard page
├── components/
│   ├── layout/
│   │   └── MainLayout.tsx        # Layout wrapper
│   ├── navigation/
│   │   ├── Navbar.tsx            # Top navigation
│   │   └── Sidebar.tsx           # Side navigation
│   └── ui/
│       ├── button.tsx            # Button component
│       ├── card.tsx              # Card component
│       └── input.tsx             # Input component
├── lib/
│   └── utils.ts                  # Utility functions
├── styles/                       # Custom styles (empty for now)
├── node_modules/                 # Dependencies (created during npm install)
├── .env.local                    # Environment variables (create as needed)
├── .eslintrc.json               # ESLint config
├── .gitignore                   # Git ignore rules
├── next.config.js               # Next.js config
├── package.json                 # Dependencies
├── package-lock.json            # Lock file (auto-generated)
├── postcss.config.mjs           # PostCSS config
├── tailwind.config.ts           # Tailwind config
├── tsconfig.json                # TypeScript config
└── README.md                    # Project readme
```

### Development Commands

| Command              | Purpose                  |
| -------------------- | ------------------------ |
| `npm run dev`        | Start development server |
| `npm run build`      | Build for production     |
| `npm start`          | Start production server  |
| `npm run lint`       | Run ESLint               |
| `npm run type-check` | Check TypeScript types   |

### Key Configuration Files

- **`tailwind.config.ts`**: Tailwind CSS theme customization
- **`tsconfig.json`**: TypeScript compiler options
- **`next.config.js`**: Next.js build configuration
- **`postcss.config.mjs`**: PostCSS plugins
- **`.eslintrc.json`**: Linting rules

### Next Steps

1. **Run the dev server**: `npm run dev`
2. **Explore the UI**: Visit http://localhost:3000
3. **Read the codebase**: Check `.github/copilot-instructions.md` for architecture details
4. **Start building**: Create new components in `components/` and pages in `app/`

### Support

For more information, check:

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Docs](https://react.dev)
