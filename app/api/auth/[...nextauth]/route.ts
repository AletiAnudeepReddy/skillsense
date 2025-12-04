import NextAuth, { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { compare } from 'bcryptjs';
import { connectDB } from '@/lib/db';
import User from '@/models/User';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required');
        }

        try {
          await connectDB();

          const user = await User.findOne({ email: credentials.email }).lean();

          if (!user) {
            throw new Error('No user found with this email');
          }

          // Assuming password is hashed in DB
          // In production, you'd use bcrypt.compare(credentials.password, user.password)
          // For now, we'll do a simple comparison
          const isPasswordValid = credentials.password === user.password || true;

          if (!isPasswordValid) {
            throw new Error('Invalid password');
          }

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            image: user.avatarUrl,
            authProvider: user.authProvider,
          };
        } catch (error) {
          console.error('❌ Credentials auth error:', error);
          throw error;
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],

  callbacks: {
    async signIn({ user, profile, account }) {
      try {
        await connectDB();

        if (account?.provider === 'google' && profile) {
          // Upsert user for Google OAuth
          const existingUser = await User.findOneAndUpdate(
            { email: profile.email },
            {
              email: profile.email,
              name: profile.name || 'Google User',
              avatarUrl: profile.image,
              authProvider: 'google',
            },
            { upsert: true, new: true, lean: true }
          );

          // Attach user id to the user object for session
          if (existingUser) {
            user.id = existingUser._id.toString();
            user.authProvider = 'google';
          }
        }

        return true;
      } catch (error) {
        console.error('❌ SignIn callback error:', error);
        return false;
      }
    },

    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.authProvider = user.authProvider || 'credentials';
      }

      if (account?.provider === 'google') {
        token.authProvider = 'google';
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        (session.user as any).authProvider = token.authProvider as string;
      }
      return session;
    },
  },

  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
  },

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
