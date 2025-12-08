import mongoose, { Document, Schema, Types } from 'mongoose';

/**
 * TypeScript interface for a learning resource
 */
export interface ILearningResource {
  type: string; // "video", "course", "article", "doc", "tutorial"
  title: string;
  url: string;
  platform?: string; // e.g., "YouTube", "Udemy", "MDN", "Official Docs"
}

/**
 * TypeScript interface for a skill learning plan
 */
export interface ISkillPlan {
  skill: string;
  priority: string; // "high", "medium", "low"
  suggestedResources: ILearningResource[];
  suggestedProjects: string[];
}

/**
 * TypeScript interface for LearningPlan document
 */
export interface ILearningPlan extends Document {
  userId?: Types.ObjectId | null;
  analysisId: Types.ObjectId;
  plan: ISkillPlan[];
  estimatedTimelineWeeks: number;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Learning Resource sub-schema
 */
const learningResourceSchema = new Schema<ILearningResource>(
  {
    type: {
      type: String,
      required: true,
      enum: ['video', 'course', 'article', 'doc', 'tutorial'],
    },
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    platform: {
      type: String,
      default: null,
    },
  },
  { _id: false }
);

/**
 * Skill Plan sub-schema
 */
const skillPlanSchema = new Schema<ISkillPlan>(
  {
    skill: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      required: true,
      enum: ['high', 'medium', 'low'],
    },
    suggestedResources: {
      type: [learningResourceSchema],
      default: [],
    },
    suggestedProjects: {
      type: [String],
      default: [],
    },
  },
  { _id: false }
);

/**
 * Learning Plan Schema definition
 */
const learningPlanSchema = new Schema<ILearningPlan>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false,
      sparse: true,
      default: null,
    },
    analysisId: {
      type: Schema.Types.ObjectId,
      ref: 'Analysis',
      required: true,
    },
    plan: {
      type: [skillPlanSchema],
      required: true,
      default: [],
    },
    estimatedTimelineWeeks: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Create index for user queries
 */
learningPlanSchema.index({ userId: 1, createdAt: -1 });
learningPlanSchema.index({ analysisId: 1 });

/**
 * Export LearningPlan model (safe for Next.js recompilation)
 */
const LearningPlan = (mongoose.models.LearningPlan as mongoose.Model<ILearningPlan>) ||
  mongoose.model<ILearningPlan>('LearningPlan', learningPlanSchema);

export { LearningPlan };
export default LearningPlan;
