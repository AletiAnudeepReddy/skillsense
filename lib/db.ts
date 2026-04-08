import mongoose from 'mongoose';

// Load all models to ensure schemas are registered
import '@/models/User';
import '@/models/Resume';
import '@/models/JobProfile';
import '@/models/Analysis';
import '@/models/LearningPlan';

if (!process.env.MONGODB_URI) {
  throw new Error('MONGODB_URI environment variable is not defined');
}

const MONGODB_URI: string = process.env.MONGODB_URI;

// Type definition for cached connection
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Extend the global namespace to avoid TypeScript errors
declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

// Initialize the global cache with proper typing
let cached = global.mongooseCache || { conn: null, promise: null };

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

/**
 * Connects to MongoDB using Mongoose.
 * Implements a caching pattern to avoid creating multiple connections in development.
 *
 * @returns Promise<typeof mongoose> - The Mongoose instance
 */
export async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      minPoolSize: 5,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then(async (mongooseInstance) => {
        // Load all models to ensure schemas are registered
        try {
          await import('@/models/User');
          await import('@/models/Resume');
          await import('@/models/JobProfile');
          await import('@/models/Analysis');
          await import('@/models/LearningPlan');
        } catch (err) {
          console.error('Error loading models:', err);
        }
        console.log('✅ MongoDB connected successfully');
        return mongooseInstance;
      })
      .catch((error) => {
        console.error('❌ MongoDB connection error:', error);
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export default connectDB;
