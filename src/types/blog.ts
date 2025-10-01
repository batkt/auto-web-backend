import { Document, Types } from 'mongoose';

export interface Block {
  id: string;
  type: 'text' | 'image' | 'video' | 'gallery';
  content?: string;
  url?: string;
  data?: {
    id: string;
    url: string;
    alt: string;
  };
  images?: string[];
}

export interface BlogData {
  title: string;
  thumbImage: string;
  categories: Types.ObjectId[];
  blocks: Block[];
  slug?: string;
  status?: 'draft' | 'published' | 'cancelled';
  publishedAt?: Date;
  author?: Types.ObjectId;
  language?: string;
}

export interface BlogDocument extends Document, BlogData {}
