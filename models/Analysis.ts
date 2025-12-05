import mongoose, { Document, Schema, Types } from 'mongoose';

/**
 * TypeScript interface for skill overlap summary
 */
export interface ISkillOverlap {
  matchedSkills: string[];
  missingCoreSkills: string[];
  missingNiceToHaveSkills: string[];
  extraSkills: string[];
}

/**
 * TypeScript interface for Analysis document
 */
export interface IAnalysis extends Document {
  userId: Types.ObjectId;
  resumeId: Types.ObjectId;
  jobProfileId: Types.ObjectId;
  matchScore: number;
  skillOverlap: ISkillOverlap;
  summary: string;
  recommendedNextSteps: string[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Skill Overlap sub-schema
 */
const skillOverlapSchema = new Schema<ISkillOverlap>(
  {
    matchedSkills: {
      type: [String],
      default: [],
    },
    missingCoreSkills: {
      type: [String],
      default: [],
    },
    missingNiceToHaveSkills: {
      type: [String],
      default: [],
    },
    extraSkills: {
      type: [String],
      default: [],
    },
  },
  { _id: false }
);

/**
 * Analysis Schema definition
 */
const analysisSchema = new Schema<IAnalysis>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    resumeId: {
      type: Schema.Types.ObjectId,
      ref: 'Resume',
      required: true,
    },
    jobProfileId: {
      type: Schema.Types.ObjectId,
      ref: 'JobProfile',
      required: true,
    },
    matchScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    skillOverlap: {
      type: skillOverlapSchema,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    recommendedNextSteps: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Export Analysis model (safe for Next.js recompilation)
 */
const Analysis = (mongoose.models.Analysis as mongoose.Model<IAnalysis>) ||
  mongoose.model<IAnalysis>('Analysis', analysisSchema);

export { Analysis };
export default Analysis;
