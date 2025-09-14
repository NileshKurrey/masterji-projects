import express from 'express'
import { isUserLoggedIn } from '../middlewares/UserValidator.middleware.js'
import { addReview,listReviews,deleteReview } from '../controllers/reviews.controller.js'

const router = express.Router();

router.post('/:bookId/reviews', isUserLoggedIn, addReview);
router.get('/:bookId/reviews', listReviews);
router.delete('/:reviewId/reviews', isUserLoggedIn, deleteReview);

export default router;
