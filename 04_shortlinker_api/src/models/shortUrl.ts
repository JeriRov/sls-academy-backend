import mongoose from 'mongoose';

const shortUrlSchema = new mongoose.Schema(
    {
        shortId: {
            type: String,
            required: true,
            unique: true,
        },
        originalURL: {
            type: String,
            required: true,
        },
    },
    {timestamps: true}
);

export const ShortUrl = mongoose.model('url', shortUrlSchema);
