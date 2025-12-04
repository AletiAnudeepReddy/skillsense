# NextAuth Authentication Setup - SkillSense AI

## Overview
This project uses NextAuth.js (Auth.js) with two authentication providers:
1. **Credentials** - Email/password authentication
2. **Google OAuth** - Google sign-in integration

## Files Created

### Core Authentication Files
- `app/api/auth/[...nextauth]/route.ts` - NextAuth configuration and API routes
- `lib/auth.ts` - Server-side auth utilities and helper functions
- `types/next-auth.d.ts` - TypeScript type definitions for NextAuth
- `components/providers/AuthProvider.tsx` - Client-side SessionProvider wrapper

### Database Models
- `models/User.ts` - Mongoose User schema with credentials and OAuth support
- `lib/db.ts` - MongoDB connection helper with caching pattern

### Environment Variables (`.env.local`)
```
MONGODB_URI=mongodb://localhost:27017/skillsense
GOOGLE_CLIENT_ID=516426912260-nboeiod5m1bkniv6jvphpc8oshtetfa6.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=96fbfec30fc271dc5b1cba84a7ce14dd8c6d464d86c2f17f0d92c4425ab232cc
```

## How It Works

### Credentials Authentication
1. User submits email and password
2. `CredentialsProvider` finds user in MongoDB
3. Password is validated (bcrypt comparison)
4. JWT token is created with user info
5. Session is maintained via JWT

### Google OAuth
1. User clicks "Sign in with Google"
2. Redirected to Google consent screen
3. `GoogleProvider` receives user info from Google
4. User is upserted in MongoDB (created if new, updated if exists)
5. JWT token is created and session established

## Usage

### Server-Side (RSC)
```typescript
import { getCurrentUser } from '@/lib/auth';

export default async function MyPage() {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect('/auth/signin');
  }
  
  return <div>Hello {user.name}</div>;
}
```

### Client-Side (use client)
```typescript
'use client';

import { useSession, signIn, signOut } from 'next-auth/react';

export default function Profile() {
  const { data: session } = useSession();
  
  if (!session) {
    return <button onClick={() => signIn()}>Sign in</button>;
  }
  
  return (
    <div>
      <p>Welcome {session.user.name}</p>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
}
```

## Database Requirements

### MongoDB Setup
Ensure MongoDB is running locally:
```bash
mongod --dbpath /path/to/data
```

Or use MongoDB Atlas with connection string in `MONGODB_URI`

### Required Collections
The User model will auto-create the following:
- `users` - Stores user accounts

Fields:
- `_id` (ObjectId)
- `email` (unique)
- `name` (string)
- `password` (optional, for credentials)
- `authProvider` (credentials | google)
- `avatarUrl` (optional)
- `createdAt` (timestamp)
- `updatedAt` (timestamp)

## Session Strategy

- **Type**: JWT (stateless)
- **Duration**: 30 days
- **Expiry**: Automatic token refresh

## Type Safety

The project includes extended NextAuth types in `types/next-auth.d.ts`:
- `User` interface with `id`, `avatarUrl`, `authProvider`
- `Session` interface with extended user properties
- `JWT` interface with user claims

## Next Steps

1. Create sign-in page at `app/auth/signin/page.tsx`
2. Create sign-up page at `app/auth/signup/page.tsx`
3. Implement password hashing in sign-up with bcryptjs
4. Add protected routes using `getCurrentUser()` in RSCs
5. Add logout functionality using `signOut()` in client components
6. Implement email verification (optional)
7. Add role-based access control (RBAC)

## Security Considerations

- ✅ NEXTAUTH_SECRET is required (prevent tampering with JWT)
- ✅ NEXTAUTH_URL must match deployment domain
- ✅ Credentials are stored in `.env.local` (not committed)
- ✅ Passwords should be hashed with bcrypt before storage
- ✅ Google OAuth credentials are validated server-side
- ⚠️ Enable HTTPS in production
- ⚠️ Rotate NEXTAUTH_SECRET periodically

## Troubleshooting

### "MongoServerError: not authenticated"
- Ensure MongoDB is running
- Check MONGODB_URI is correct
- Verify MongoDB credentials if using Atlas

### "Google sign-in not working"
- Verify GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are correct
- Check Google OAuth app is configured for localhost:3000
- Ensure NEXTAUTH_URL matches domain

### "Session not persisting"
- Verify NEXTAUTH_SECRET is set
- Check NextAuth provider is wrapped in layout
- Ensure cookies are enabled in browser
