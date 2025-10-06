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

export interface ProductData {
  proModel: string;
  name: string;
  desc?: string;
  size?: [string];
  qty: number;
  brand?: Types.ObjectId[];
  blocks: Block[];
  productImg: string;

  slug?: string;
  status?: 'draft' | 'published' | 'cancelled';
  publishedAt?: Date;
  language?: string;
  price?: number;
}

export interface ProductDocument extends Document, ProductData {}
