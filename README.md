# SkillSense AI

AI-powered job skill gap analyzer that helps users identify gaps between their current skills and job requirements.

## Features

- 📄 **Resume Analysis**: Upload and analyze your resume
- 🎯 **Job Matching**: Compare skills against job descriptions
- 🤖 **AI-Powered Insights**: Get AI-generated skill gap analysis
- 📚 **Learning Plans**: Receive personalized learning recommendations
- 📊 **Progress Tracking**: Monitor your skill development over time

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod
- **Runtime**: Node.js

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd skillsense-ai
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

### Project Structure

```
├── app/                    # Next.js App Router
├── components/            # React components
│   ├── layout/           # Layout components
│   ├── navigation/       # Navigation components
│   └── ui/              # shadcn/ui components
├── lib/                  # Utility functions
├── styles/              # Global styles
└── public/              # Static assets
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
