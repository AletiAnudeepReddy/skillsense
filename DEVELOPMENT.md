# SkillSense AI - Development & Deployment Guide

## Quick Start (Development)

This guide covers running both the Next.js frontend and FastAPI ML microservice locally.

### Prerequisites

- **Node.js 18+** (for Next.js)
- **Python 3.10+** (for FastAPI)
- **MongoDB** running locally (default: `mongodb://localhost:27017/skillsense`)
- Git

### Setup - First Time Only

#### 1. Clone/Navigate to Project

```bash
cd c:\Users\aleti\Desktop\Projects\SkillSense
```

#### 2. Install Next.js Dependencies

```bash
npm install
```

#### 3. Setup FastAPI ML Service

```bash
cd ml_service
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cd ..
```

#### 4. Configure Environment Variables (Optional)

Create `.env.local` in root directory:

```
# ML Service endpoint
ML_SERVICE_URL=http://localhost:8000

# NextAuth
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# Database
MONGODB_URI=mongodb://localhost:27017/skillsense
```

Create `.env` in `ml_service/` directory:

```
DEBUG=False
HOST=0.0.0.0
PORT=8000
LOG_LEVEL=INFO
CORS_ORIGINS=http://localhost:3000,http://localhost:8000
```

### Running Services - Every Session

#### Terminal 1: Start ML Microservice

```bash
cd ml_service
source venv/bin/activate  # Windows: venv\Scripts\activate
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Expected output:

```
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
```

Then visit:

- **Swagger UI**: http://localhost:8000/docs
- **Health Check**: http://localhost:8000/health
- **ReDoc**: http://localhost:8000/redoc

#### Terminal 2: Start Next.js Dev Server

```bash
npm run dev
```

Expected output:

```
  ▲ Next.js 14.0.0
  - Local:        http://localhost:3000
```

Visit http://localhost:3000 in your browser.

#### Terminal 3 (Optional): MongoDB

If using MongoDB locally, ensure it's running:

```bash
mongod
# or: brew services start mongodb-community  (macOS)
# or: net start MongoDB  (Windows)
```

### Testing the Integration

#### Test Resume Upload

1. Go to http://localhost:3000/dashboard
2. Navigate to Resume → Upload
3. Enter text (e.g., "John Doe\nSoftware Engineer\nPython, JavaScript")
4. Click "Parse Resume"
5. Should see preview with parsed name, title, skills

#### Test Job Description

1. Navigate to Jobs → Target Job
2. Enter text (e.g., "Senior Python Developer\nRequired: Python, Docker")
3. Click "Parse Job"
4. Should see preview with job title, required/nice-to-have skills

#### Manual API Testing with Curl

```bash
# Test resume parsing
curl -X POST http://localhost:3000/api/resume/parse \
  -H "Content-Type: application/json" \
  -d '{"linkedinUrl":"https://linkedin.com/in/test"}'

# Test job parsing
curl -X POST http://localhost:3000/api/jobs/parse \
  -H "Content-Type: application/json" \
  -d '{"jdText":"Senior Python Developer\nRequired: Python, Docker"}'

# Check ML service health
curl http://localhost:8000/health
```

### Common Commands

```bash
# Frontend type checking
npm run type-check

# Frontend linting
npm run lint

# Build for production
npm run build

# Start production server
npm start

# FastAPI service with custom port
python -m uvicorn app.main:app --reload --port 9000

# Run tests (when implemented)
npm run test
python -m pytest ml_service/tests
```

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│ Browser (Client)                                            │
└────────────────┬────────────────────────────────────────────┘
                 │ HTTP
                 ▼
┌─────────────────────────────────────────────────────────────┐
│ Next.js 14 (Port 3000)                                      │
├─────────────────────────────────────────────────────────────┤
│ • Pages: /dashboard, /resume/upload, /jobs/target          │
│ • API Routes: /api/resume/parse, /api/jobs/parse           │
│ • Components: Navbar, Sidebar, Layout                      │
│ • Auth: NextAuth.js                                        │
└────────────────┬────────────────────────────────────────────┘
                 │ HTTP (fetch)
                 ▼
┌─────────────────────────────────────────────────────────────┐
│ FastAPI ML Service (Port 8000)                              │
├─────────────────────────────────────────────────────────────┤
│ • POST /ml/resume/parse — Resume parsing logic             │
│ • POST /ml/job/parse — Job description parsing             │
│ • GET /health — Health check                               │
└────────────────┬────────────────────────────────────────────┘
                 │ Mongoose
                 ▼
┌─────────────────────────────────────────────────────────────┐
│ MongoDB (localhost:27017)                                   │
├─────────────────────────────────────────────────────────────┤
│ • Database: skillsense                                      │
│ • Collections: users, resumes, jobprofiles                  │
└─────────────────────────────────────────────────────────────┘
```

## File Structure Reference

```
SkillSense/
├── app/
│   ├── (auth)/           # Login/Register pages
│   ├── api/
│   │   ├── auth/         # Authentication endpoints
│   │   ├── resume/parse/route.ts      # Resume parsing API
│   │   └── jobs/parse/route.ts        # Job parsing API
│   ├── dashboard/        # Dashboard page
│   ├── resume/           # Resume upload/history
│   ├── jobs/             # Job target page
│   └── layout.tsx        # Root layout
├── components/
│   ├── layout/           # MainLayout wrapper
│   ├── navigation/       # Navbar, Sidebar
│   ├── providers/        # Auth, Loading providers
│   └── ui/               # Button, Card, Input, etc
├── lib/
│   ├── auth.ts           # NextAuth config
│   ├── db.ts             # MongoDB connection
│   ├── mlClient.ts       # ML service client
│   └── utils.ts          # cn() helper
├── models/               # Mongoose models
│   ├── User.ts
│   ├── Resume.ts
│   └── JobProfile.ts
├── types/
│   └── next-auth.d.ts    # Auth type extensions
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js

ml_service/
├── app/
│   ├── main.py          # FastAPI app entry
│   ├── core/
│   │   ├── config.py    # Settings
│   │   └── models.py    # Pydantic models
│   └── routers/
│       ├── resume.py    # Resume parsing
│       └── job.py       # Job parsing
├── requirements.txt     # Python dependencies
├── .env.example         # Example env vars
└── README.md            # FastAPI service docs
```

## Troubleshooting

### ML Service Connection Error

**Error**: `Error: fetch failed to http://localhost:8000/...`

**Solution**:

- Ensure FastAPI service is running: `python -m uvicorn app.main:app --reload`
- Check `ML_SERVICE_URL` in `.env.local` matches service port (default 8000)
- Check CORS configuration in `ml_service/app/core/config.py`

### MongoDB Connection Error

**Error**: `MongooseError: Cannot connect to mongodb://localhost:27017`

**Solution**:

- Start MongoDB: `mongod` (or your platform's start command)
- Verify `MONGODB_URI` in `.env.local`
- Check MongoDB is accessible on port 27017

### Port Already in Use

**Error**: `Address already in use` for port 3000 or 8000

**Solution**:

```bash
# Kill process on port 3000 (Next.js)
npx kill-port 3000

# Kill process on port 8000 (FastAPI)
npx kill-port 8000  # or: lsof -ti:8000 | xargs kill -9
```

### TypeScript Errors in VS Code

**Solution**:

```bash
npm run type-check
```

If persists, restart TypeScript server in VS Code (Cmd+Shift+P → "TypeScript: Restart TS Server")

## Week 2-3 Development Focus

### Week 2 (Current)

✅ Frontend layout and navigation  
✅ Resume/Job parsing UI pages  
✅ API route scaffolding  
✅ FastAPI service skeleton with dummy parsing  
🟡 Integration testing between services

### Week 3 (Next)

- [ ] Real NLP integration (spaCy)
- [ ] Skill matching with embeddings (sentence-transformers)
- [ ] Authentication in API routes (getServerSession)
- [ ] File upload handling
- [ ] Resume/job history endpoints
- [ ] Skill gap analysis

## Deployment (Future)

For production deployment:

1. **Frontend**: Vercel, Netlify, or self-hosted
2. **ML Service**: Docker container on AWS/GCP/Azure
3. **Database**: MongoDB Atlas or self-hosted
4. **Environment**: Set `.env.local` variables from secrets manager

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [FastAPI Docs](https://fastapi.tiangolo.com)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [MongoDB](https://docs.mongodb.com)
- [Mongoose](https://mongoosejs.com/docs)

## Support & Questions

See `SETUP.md`, `AUTH.md`, and `QUICKSTART.md` for additional setup and feature documentation.

---

**Last Updated**: December 4, 2025
