import type { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface User extends DefaultUser {
    id: string;
    avatarUrl?: string;
    authProvider: 'credentials' | 'google';
  }

  interface Session extends DefaultSession {
    user: {
      id: string;
      email: string;
      name: string | null;
      image: string | null;
      avatarUrl?: string;
      authProvider: 'credentials' | 'google';
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    name: string | null;
    email: string;
    authProvider: 'credentials' | 'google';
  }
}
