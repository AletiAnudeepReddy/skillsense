import mongoose, { Document, Model, Schema, Types } from 'mongoose';

/**
 * TypeScript interface for parsed job data
 */
export interface IParsedJob {
  requiredSkills: string[];
  niceToHaveSkills: string[];
  responsibilities?: string[];
  seniorityLevel?: string;
}

/**
 * TypeScript interface for JobProfile document
 */
export interface IJobProfile extends Document {
  userId?: Types.ObjectId | null;
  sourceType: 'paste' | 'link';
  jobTitle: string;
  company?: string;
  location?: string;
  rawText: string;
  parsed: IParsedJob;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Parsed Job sub-schema
 */
const parsedJobSchema = new Schema<IParsedJob>(
  {
    requiredSkills: {
      type: [String],
      default: [],
    },
    niceToHaveSkills: {
      type: [String],
      default: [],
    },
    responsibilities: {
      type: [String],
      default: [],
    },
    seniorityLevel: {
      type: String,
      default: undefined,
    },
  },
  { _id: false }
);

/**
 * JobProfile Schema definition
 */
const jobProfileSchema = new Schema<IJobProfile>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false,
      default: null,
      index: true,
    },
    sourceType: {
      type: String,
      enum: ['paste', 'link'],
      required: true,
    },
    jobTitle: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      trim: true,
      default: undefined,
    },
    location: {
      type: String,
      default: undefined,
    },
    rawText: {
      type: String,
      required: true,
    },
    parsed: {
      type: parsedJobSchema,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create an index for user queries
jobProfileSchema.index({ userId: 1, createdAt: -1 });

/**
 * Create or retrieve JobProfile model
 * Prevents duplicate model compilation in Next.js hot reload
 */
const JobProfile = (mongoose.models.JobProfile as Model<IJobProfile>) ||
  mongoose.model<IJobProfile>('JobProfile', jobProfileSchema);

export { JobProfile };
export default JobProfile;
