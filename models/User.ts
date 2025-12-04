import mongoose, { Document, Model, Schema } from 'mongoose';

/**
 * TypeScript interface for User document
 */
export interface IUser extends Document {
  authProvider: 'credentials' | 'google';
  email: string;
  name: string;
  password?: string; // Optional for Google OAuth
  avatarUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * User Schema definition
 */
const userSchema = new Schema<IUser>(
  {
    authProvider: {
      type: String,
      enum: ['credentials', 'google'],
      required: true,
      default: 'credentials',
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      default: undefined, // Optional for OAuth users
    },
    avatarUrl: {
      type: String,
      default: undefined,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Create or retrieve User model
 * Prevents duplicate model compilation in Next.js hot reload
 */
const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;
