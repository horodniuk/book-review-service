import express from 'express';
import { createReview } from '../controllers/reviewController';

export default (router: express.Router): void => {
    router.post('/api/review', createReview);

}