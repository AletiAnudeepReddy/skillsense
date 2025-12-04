import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

/**
 * Get the current user session on the server
 * @returns User object with id, email, name if logged in, else null
 */
export async function getCurrentUser() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return null;
    }

    return {
      id: (session.user as any).id,
      email: session.user.email,
      name: session.user.name,
      avatarUrl: session.user.image,
      authProvider: (session.user as any).authProvider,
    };
  } catch (error) {
    console.error('❌ Error getting current user:', error);
    return null;
  }
}

/**
 * Helper to check if user is authenticated
 * @returns true if user is logged in, false otherwise
 */
export async function isAuthenticated() {
  const user = await getCurrentUser();
  return !!user;
}

export { authOptions };
