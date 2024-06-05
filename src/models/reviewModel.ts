import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
    bookId: { type: Number, required: true },
    content: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    createdAt: { type: Date, default: Date.now }
});

const ReviewModel = mongoose.model('Review', ReviewSchema);

export const createReviewInDB = (values: Record<string, any>) =>
    new ReviewModel(values).save().then((review) => review.toObject());

export const getReviewsFromDB = () => ReviewModel.find();

export const getReviewByIdFromDB = (id: string) => ReviewModel.findById(id);

export const updateReviewInDB = (id: string, values: Record<string, any>) =>
    ReviewModel.findByIdAndUpdate(id, values, { new: true });

export const deleteReviewByIdFromDB = (id: string) => ReviewModel.findByIdAndDelete(id);