import mongoose, { Document, Model, Schema, Types } from 'mongoose';

/**
 * TypeScript interface for parsed resume data
 */
export interface IParsedResume {
  name?: string;
  title?: string;
  summary?: string;
  skills: string[];
}

/**
 * TypeScript interface for Resume document
 */
export interface IResume extends Document {
  userId: Types.ObjectId;
  sourceType: 'upload' | 'linkedin';
  originalFileUrl?: string;
  linkedinUrl?: string;
  rawText: string;
  parsed: IParsedResume;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Parsed Resume sub-schema
 */
const parsedResumeSchema = new Schema<IParsedResume>(
  {
    name: {
      type: String,
      default: undefined,
    },
    title: {
      type: String,
      default: undefined,
    },
    summary: {
      type: String,
      default: undefined,
    },
    skills: {
      type: [String],
      default: [],
    },
  },
  { _id: false }
);

/**
 * Resume Schema definition
 */
const resumeSchema = new Schema<IResume>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    sourceType: {
      type: String,
      enum: ['upload', 'linkedin'],
      required: true,
    },
    originalFileUrl: {
      type: String,
      default: undefined,
    },
    linkedinUrl: {
      type: String,
      default: undefined,
    },
    rawText: {
      type: String,
      required: true,
    },
    parsed: {
      type: parsedResumeSchema,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create an index for user queries
resumeSchema.index({ userId: 1, createdAt: -1 });

/**
 * Create or retrieve Resume model
 * Prevents duplicate model compilation in Next.js hot reload
 */
const Resume = (mongoose.models.Resume as Model<IResume>) || mongoose.model<IResume>('Resume', resumeSchema);

export { Resume };
export default Resume;
