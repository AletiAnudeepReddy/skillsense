# SkillSense AI - Copilot Instructions

> AI coding agent instructions for the SkillSense AI codebase
> Last Updated: December 4, 2025

## Project Overview

**SkillSense AI** is an AI-powered job skill gap analyzer that helps users:

- Upload their resume and analyze it against job descriptions
- Identify skill gaps with personalized AI insights
- Generate tailored learning plans to bridge skill gaps
- Track progress on skill development over time

**Tech Stack:** Next.js 14 (App Router) + TypeScript + Tailwind CSS + shadcn/ui

## Architecture & Components

### Directory Structure

```
├── app/                         # Next.js App Router
│   ├── layout.tsx              # Root layout with Inter font, Tailwind setup
│   ├── globals.css             # Tailwind base, components, utilities
│   └── dashboard/              # Dashboard page (authenticated)
├── components/
│   ├── layout/                 # MainLayout wrapper for authenticated pages
│   ├── navigation/             # Navbar, Sidebar components
│   └── ui/                     # shadcn/ui components (Button, Card, Input)
├── lib/
│   └── utils.ts               # Helper: cn() for Tailwind class merging
├── styles/                     # Additional custom styles (if needed)
├── tailwind.config.ts          # Tailwind configuration
├── tsconfig.json              # TypeScript paths: @ = root
├── next.config.js             # Next.js configuration
├── postcss.config.mjs          # PostCSS with Tailwind & autoprefixer
└── package.json               # Dependencies
```

**Key Components:**

- `MainLayout`: Wraps authenticated pages with Navbar + Sidebar + scrollable main content
- `Navbar`: Logo, quick actions button, user avatar dropdown
- `Sidebar`: Navigation with lucide-react icons, active link highlighting, mobile responsive
- `Dashboard`: Welcome section, stat cards (mock data), recent analyses list, chart placeholder

### Data Flow & Integration Points

- **UI Layer**: React components with shadcn/ui styling
- **State Management**: React hooks (useState in Navbar/Sidebar for dropdown, mobile menu)
- **Navigation**: Next.js usePathname() for active route detection
- **Styling**: Tailwind CSS utilities with custom cn() helper for class merging
- **Future APIs**: Placeholder for backend skill analysis, resume upload, job matching

## Development Workflows

### Installation & Setup

```bash
npm install
```

Dependencies: next, react, typescript, tailwindcss, shadcn/ui components, lucide-react, react-hook-form, zod

### Running Locally

```bash
npm run dev
# App runs at http://localhost:3000
```

### Building for Production

```bash
npm run build
npm start
```

### Type Checking

```bash
npm run type-check
```

### Linting

```bash
npm run lint
```

## Code Patterns & Conventions

### Component Structure

- **Server Components**: Default in app/ directory (layouts, pages)
- **Client Components**: Use `'use client'` when needing interactivity (Navbar, Sidebar dropdowns)
- **UI Components**: Located in `components/ui/` following shadcn/ui patterns

### Styling Approach

- **Tailwind First**: All styling via @tailwind directives in `app/globals.css`
- **Class Merging**: Use `cn()` helper from `lib/utils.ts` to safely merge Tailwind classes
- **Responsive Design**: Mobile-first with `md:` breakpoint for tablet+ (e.g., Sidebar collapses on mobile)
- **Color Palette**: Slate colors via Tailwind theme, blue for primary actions

### Naming Conventions

- **Components**: PascalCase (e.g., `MainLayout`, `Navbar`)
- **Files**: match component name or use descriptive names (`page.tsx`, `layout.tsx`)
- **Variables**: camelCase (e.g., `isOpen`, `navigationItems`)
- **Icons**: Import from lucide-react (e.g., `LayoutDashboard`, `ChevronDown`)

### Navigation & Routing

- **App Router**: `/app/dashboard/page.tsx` → `/dashboard` route
- **Links**: Use Next.js `Link` component for client-side navigation
- **Active Routes**: Sidebar uses `usePathname()` to highlight current page
- **Mobile Sidebar**: Menu toggle state persists in component state (not persisted to localStorage yet)

### Error Handling

- TypeScript strict mode enabled for type safety
- Form validation: use `react-hook-form` + `zod` for schema validation (setup ready, not yet integrated)
- UI errors: Use `Button` variant="destructive" for error states

### Responsive Design Pattern

- **Desktop**: Fixed Navbar (top), fixed Sidebar (left), main content scrolls
- **Mobile**: Fixed Navbar, sidebar slides in from left (overlay), main content below navbar
- Example: Sidebar uses conditional `md:` class for responsive behavior

## Dependencies & External Services

| Dependency      | Version  | Purpose     | Usage Notes                                    |
| --------------- | -------- | ----------- | ---------------------------------------------- |
| next            | ^14.0.0  | Framework   | App Router, SSR, static gen                    |
| react           | ^18.2.0  | UI Library  | Component rendering                            |
| typescript      | ^5.3.0   | Type Safety | Strict mode enabled                            |
| tailwindcss     | ^3.4.0   | Styling     | Content paths: app/**, components/**, lib/\*\* |
| lucide-react    | ^0.294.0 | Icons       | LayoutDashboard, FileText, Briefcase, etc.     |
| react-hook-form | ^7.48.0  | Forms       | Schema validation (setup ready)                |
| zod             | ^3.22.0  | Validation  | Form & API validation schemas                  |
| clsx            | ^2.0.0   | Class Utils | Conditional classname joining                  |
| tailwind-merge  | ^2.2.0   | Class Merge | Smart Tailwind class merging                   |

## Important Files & Their Purposes

- `app/layout.tsx`: Root layout with Inter font, gradient background, Tailwind reset
- `app/globals.css`: Tailwind directives, custom scrollbar, smooth transitions
- `components/layout/MainLayout.tsx`: Layout wrapper for authenticated pages
- `components/navigation/Navbar.tsx`: Top navigation with logo, quick actions, user menu
- `components/navigation/Sidebar.tsx`: Left sidebar with active link detection, mobile toggle
- `app/dashboard/page.tsx`: Dashboard shell with stat cards, recent analyses, chart placeholder
- `lib/utils.ts`: `cn()` helper for merging Tailwind classes
- `tailwind.config.ts`: Tailwind theme, content paths, custom extensions
- `tsconfig.json`: TypeScript paths (@ → root), strict mode, module resolution

## Known Gotchas & Tips

- **Mobile Sidebar State**: Sidebar toggle state is local to component; refreshing page closes menu
- **Active Route Detection**: Sidebar uses `usePathname()` which updates on route changes
- **Tailwind Content Paths**: Update `tailwind.config.ts` content array if adding new directories
- **Font Variable**: Inter font loads via `next/font/google` with `--font-inter` CSS variable
- **Icon Names**: Refer to lucide-react docs for available icons; not all naming conventions match Figma
- **shadcn/ui Components**: Button, Card, Input are manually implemented in `components/ui/` (not from npm package yet)
- **Form Integration**: react-hook-form + zod are installed but not yet integrated; add wrapper components as needed

## Common Tasks

### Adding a New Page

1. Create `app/[route]/page.tsx` with default export
2. Wrap content with `MainLayout` if it's an authenticated page
3. Add navigation item to `navigationItems` array in `Sidebar.tsx`
4. Sidebar automatically highlights the active link via `usePathname()`

### Adding a New UI Component

1. Create `components/[component]/[Name].tsx`
2. Use TypeScript for type safety
3. Use Tailwind classes + `cn()` helper for styling
4. Export as default or named export

### Styling a Component

1. Use Tailwind utilities (e.g., `px-4 py-2 rounded-lg`)
2. Use `cn()` helper to merge conflicting Tailwind classes
3. Keep spacing consistent: use multiples of 4 (p-4, gap-6, etc.)
4. Use slate color palette for neutral text/borders

## Useful References

- [Next.js 14 Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)
- [React Hook Form Docs](https://react-hook-form.com/)
- [Zod Validation](https://zod.dev/)

### Common Tasks

#### Adding a New Feature

1. [Step 1]
2. [Step 2]
3. [Step 3]

#### Modifying Existing Components

- [Key considerations]
- [Testing requirements]

## Dependencies & External Services

| Dependency     | Version   | Purpose   | Usage Notes                |
| -------------- | --------- | --------- | -------------------------- |
| [Package Name] | [Version] | [Purpose] | [Any specific usage notes] |

## Testing Strategy

- Test types used: [unit, integration, e2e]
- Test file location: `tests/`
- Running tests: `[command]`
- Coverage requirements: [If applicable]

## Important Files & Their Purposes

- `[File]`: [Purpose and key patterns]
- `[File]`: [Purpose and key patterns]

## Known Gotchas & Tips

- [Common mistake]: How to avoid it
- [Performance consideration]: How to handle it
- [Non-obvious pattern]: Why it's done this way

## Useful References

- [Architecture decision document]
- [API documentation]
- [Setup guide for new developers]

---

## Template Usage Notes

**To complete this file:**

1. Explore the actual project structure and files
2. Fill in each section with concrete details from your codebase
3. Include specific file paths and examples
4. Document why certain patterns exist, not just what they are
5. Focus on knowledge that isn't immediately obvious from reading code

**Key Principles:**

- Be specific with examples from YOUR codebase
- Avoid generic advice - focus on SkillSense-specific patterns
- Document discoverable patterns, not aspirational practices
- Keep it concise but comprehensive (~20-50 lines of actual content)
