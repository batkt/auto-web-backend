import { Document } from 'mongoose';

export interface TranslatedText {
  en: string;
  mn: string;
}

export interface CategoryData {
  name: TranslatedText;
  description?: TranslatedText;
}

export interface CategoryDocument extends Document, CategoryData {}
