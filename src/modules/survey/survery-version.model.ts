import mongoose, { Document, Schema } from 'mongoose';

enum AnswerType {
  SHORT_TEXT = 'short_text',
  LONG_TEXT = 'long_text',
  SINGLE_CHOICE = 'single_choice',
  MULTIPLE_CHOICE = 'multiple_choice',
  NUMBER = 'number',
  DATE = 'date',
}

export interface Question {
  questionText: string;
  description?: string;
  answerType: AnswerType;
  options?: string[];
  order: number; // Add order field for questions
  isRequired: boolean; // Add isRequired field for questions
}

export interface SurveyVersion extends Document {
  surveyId: string;
  version: number;
  isActive: boolean;
  groups: Group[];
  questions: Question[];
}

export interface Group {
  title: string;
  description?: string;
  questions: Question[];
  order: number; // Add order field for groups
}

const QuestionSchema: Schema = new Schema({
  questionText: { type: String, required: true },
  description: { type: String },
  answerType: { type: String, enum: Object.values(AnswerType), required: true },
  options: { type: [String] },
  order: { type: Number, required: true },
  isRequired: { type: Boolean, default: true }, // Add isRequired field with default false
});

const GroupSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  questions: { type: [QuestionSchema], required: true }, // Make questions required
  order: { type: Number, required: true },
});

const SurveyVersionSchema: Schema = new Schema(
  {
    surveyId: { type: String, required: true },
    version: { type: Number, required: true },
    isActive: { type: Boolean, default: true },
    groups: { type: [GroupSchema], required: false },
    questions: { type: [QuestionSchema], required: false },
  },
  {
    timestamps: true, // Add timestamps option to track creation and update times
  },
);

export default mongoose.model<SurveyVersion>('SurveyVersion', SurveyVersionSchema);
