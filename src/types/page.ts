import { Document, Types } from 'mongoose';

export interface MultilingualText {
  mn: string;
  en: string;
}

export interface PageData {
  slug: string;
  name: MultilingualText;
  description: MultilingualText;
  keywords: string[];
  sections: Types.ObjectId[];
}

export interface SectionData {
  pageId: Types.ObjectId;
  sortOrder?: number;
  data: Record<string, any>;
  key: string;
}

export interface PageDocument extends Document, PageData {}
export interface SectionDocument extends Document, SectionData {}

export interface FieldDefinition {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'image' | 'array' | 'object';
  required?: boolean;
  sortOrder?: number;
}
