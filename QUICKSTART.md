# Quick Start Guide

## 🚀 Get Running in 3 Steps

### 1. Install Dependencies

```bash
cd c:\Users\aleti\Desktop\Projects\SkillSense
npm install
```

⏱️ Takes ~2-5 minutes depending on internet speed

### 2. Start Development Server

```bash
npm run dev
```

You'll see:

```
> next dev
  ▲ Next.js 14.0.0
  - Local: http://localhost:3000
```

### 3. Open Browser

Visit: **http://localhost:3000**

---

## ✨ What You'll See

- **Navbar**: SkillSense AI logo, "Run New Analysis" button, user avatar dropdown
- **Sidebar**: Navigation with Dashboard, Resume, Jobs, Analysis, Learning Plan (disabled), Settings
- **Dashboard**: Welcome message, 3 stat cards (mock data), recent analyses, chart placeholder
- **Responsive**: Try resizing browser - sidebar collapses on mobile!

---

## 📁 Project Structure

```
app/                 → Pages & layouts
components/          → React components
  ├── layout/       → MainLayout wrapper
  ├── navigation/   → Navbar, Sidebar
  └── ui/           → Button, Card, Input
lib/                → Utility functions (cn() helper)
```

---

## 🔧 Common Commands

| Command              | What it does                  |
| -------------------- | ----------------------------- |
| `npm run dev`        | Start dev server (hot-reload) |
| `npm run build`      | Build for production          |
| `npm start`          | Run production server         |
| `npm run lint`       | Check code style              |
| `npm run type-check` | Verify TypeScript types       |

---

## 📚 Key Files to Know

| File                                | Purpose                                 |
| ----------------------------------- | --------------------------------------- |
| `app/layout.tsx`                    | Root layout (adds Inter font, Tailwind) |
| `app/dashboard/page.tsx`            | Dashboard page with UI demo             |
| `components/layout/MainLayout.tsx`  | Layout for authenticated pages          |
| `components/navigation/Navbar.tsx`  | Top navigation bar                      |
| `components/navigation/Sidebar.tsx` | Left sidebar navigation                 |
| `lib/utils.ts`                      | `cn()` helper for Tailwind classes      |
| `.github/copilot-instructions.md`   | Architecture & conventions              |

---

## 🎨 Styling with Tailwind

All styling uses Tailwind CSS utility classes. Example:

```tsx
<button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
  Click me
</button>
```

To merge classes safely, use the `cn()` helper:

```tsx
import { cn } from "@/lib/utils";

const buttonClass = cn("px-4 py-2", condition && "bg-red-600");
```

---

## 🚦 Adding a New Page

1. Create file: `app/my-page/page.tsx`
2. Wrap with `MainLayout` if authenticated:

   ```tsx
   import MainLayout from "@/components/layout/MainLayout";

   export default function MyPage() {
     return (
       <MainLayout>
         <h1>My Page</h1>
       </MainLayout>
     );
   }
   ```

3. Add to sidebar in `components/navigation/Sidebar.tsx`
4. Sidebar auto-highlights active page!

---

## 🐛 Troubleshooting

**Port 3000 in use?**

```bash
npm run dev -- -p 3001
```

**TypeScript errors?**

```bash
npm run type-check
```

**Dependencies broken?**

```bash
rm -r node_modules package-lock.json
npm install
```

---

## 📖 Documentation

- **Full Setup**: See `SETUP.md`
- **Installation Summary**: See `INSTALLATION_COMPLETE.md`
- **Architecture**: See `.github/copilot-instructions.md`
- **Project Info**: See `README.md`

---

**Next.js 14 | TypeScript | Tailwind CSS | shadcn/ui**
