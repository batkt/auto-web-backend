import mongoose, { Schema, Document } from 'mongoose';

interface Answer {
  questionId: string;
  value: string | string[];
}

export interface SurveyResponse extends Document {
  surveyId: string;
  ipAddress: string;
  deviceInfo: string;
  respondentInfo?: {
    email?: string;
    userId?: string;
    ip?: string;
  };
  answers: Answer[];
}

const AnswerSchema: Schema = new Schema({
  questionId: { type: String, required: true },
  value: { type: Schema.Types.Mixed, required: true },
});

const SurveyResponseSchema: Schema = new Schema(
  {
    surveyId: { type: Schema.Types.ObjectId, ref: 'Survey', required: true },
    version: { type: Number, required: true },
    respondentInfo: {
      email: { type: String },
      userId: { type: String },
    },
    answers: { type: [AnswerSchema], required: true },
    ipAddress: { type: String },
    deviceInfo: { type: String },
  },
  {
    timestamps: true, // Add timestamps to track response creation and update times
  },
);

export default mongoose.model<SurveyResponse>('SurveyResponse', SurveyResponseSchema);
