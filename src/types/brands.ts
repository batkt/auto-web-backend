import { Document } from 'mongoose';

export interface TranslatedText {
  en: string;
  mn: string;
}

export interface BrandData {
  name: TranslatedText;
  description?: TranslatedText;
}

export interface BrandDocument extends Document, BrandData {}
