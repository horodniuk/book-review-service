import express from 'express';
import axios from 'axios';
import { createReviewInDB, getReviewsFromDB, getReviewByIdFromDB, updateReviewInDB, deleteReviewByIdFromDB } from '../models/reviewModel';

export const createReview = async (req: express.Request, res: express.Response) => {
    try {
        const { bookId, content, rating } = req.body;


        try {
            const bookResponse = await axios.get(`http://localhost:8080/api/books/${bookId}`);
            if (bookResponse.status !== 200) {
                return res.status(400).json({ error: 'Invalid book ID' });
            }
        } catch (error) {
            return res.status(400).json({ error: 'Book not found' });
        }

        const review = await createReviewInDB({ bookId, content, rating });
        return res.status(201).json(review);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const getReviews = async (req: express.Request, res: express.Response) => {
    try {
        const reviews = await getReviewsFromDB();
        return res.status(200).json(reviews);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const getReviewById = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const review = await getReviewByIdFromDB(id);
        if (!review) {
            return res.sendStatus(404);
        }
        return res.status(200).json(review);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const updateReview = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const { content, rating } = req.body;

        const review = await updateReviewInDB(id, { content, rating });
        if (!review) {
            return res.sendStatus(404);
        }
        return res.status(200).json(review);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const deleteReview = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const review = await deleteReviewByIdFromDB(id);
        if (!review) {
            return res.sendStatus(404);
        }
        return res.sendStatus(204);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};