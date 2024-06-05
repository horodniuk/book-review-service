import express from 'express';
import reviewRoutes from './routes/reviewRoutes';

const router = express.Router();

export default (): express.Router => {
    reviewRoutes(router);

    return router;
}