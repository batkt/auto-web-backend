import mongoose, { Schema } from 'mongoose';
import { SectionDocument } from '../../types/page';

const sectionSchema = new Schema<SectionDocument>({
    pageId: {
        type: Schema.Types.ObjectId,
        ref: 'Page',
        required: true
    },
    sortOrder: {
        type: Number,
        default: 0
    },
    data: {
        type: Schema.Types.Mixed,
        required: true
    },
    key: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

// Index for efficient querying by pageId and sortOrder
sectionSchema.index({ pageId: 1, sortOrder: 1 });

export const SectionModel = mongoose.model<SectionDocument>('Section', sectionSchema); 