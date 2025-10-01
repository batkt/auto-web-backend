import mongoose, { Schema, Document } from 'mongoose';

export enum SurveyStatus {
  SAVED = 'saved',
  STARTED = 'started',
  FINISHED = 'finished',
  STOPPED = 'stopped',
  ARCHIVED = 'archived',
}

export interface Survey extends Document {
  title: string;
  description?: string;
  status: SurveyStatus;
  isAnswered: boolean;
}

const SurveySchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    isAnswered: { type: Boolean, default: false },
    status: { type: String, enum: Object.values(SurveyStatus), default: SurveyStatus.SAVED },
  },
  {
    timestamps: true, // Add timestamps option to track creation and update times
  },
);

export default mongoose.model<Survey>('Survey', SurveySchema);
