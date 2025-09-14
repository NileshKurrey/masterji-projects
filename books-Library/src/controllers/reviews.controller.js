import { ApiError } from "../libs/api-error.js";
import { ApiResponse } from "../libs/api-response.js";
import { asyncHandler } from "../libs/asyncHandler.js";
import { db } from "../libs/db.js";
import { sendMail } from "../libs/mails.js";


//add review to a book
export const addReview = asyncHandler(async (req, res) => {
    const { bookId } = req.params;
    const { rating, content } = req.body;
    const userId = req.user.id;
    if (!rating || !content) {
        return next(new ApiError(400, 'All fields are required'));
    }
    const book = await db.book.findUnique({ where: { id: bookId } });
    if (!book) {
        return next(new ApiError(404, 'Book not found'));
    }
    const newReview = await db.review.create({
        data: {
            rating,
            content,
            bookId,
            userId
        }
    });
    !newReview && next(new ApiError(500, 'Failed to add review'));
    res.status(201).json(new ApiResponse(201, newReview, 'Review added successfully'));
    const user = await db.user.findUnique({ where: { id: userId } });
    const options = {
        email: user.email,
        subject: 'New Review Added',
        mailGenContent: {
            body: {
                name: user.name,
                intro: 'You have successfully added a new review.',
                table: {
                    data: [
                        {
                            Rating: rating,
                            Content: content,
                            Book: book.title
                        }
                    ]
                }
            }
        }
    };
    sendMail(options);
});

//list reviews of a book
export const listReviews = asyncHandler(async (req, res) => {
    const { bookId } = req.params;
    const book = await db.book.findUnique({ where: { id: bookId } });

    if (!book) {
        return next(new ApiError(404, 'Book not found'));
    }
    const reviews = await db.review.findMany({
        where: { bookId },
        include: { user: { select: { name: true, email: true } } },
        orderBy: { createdAt: 'desc' }
    });
    res.status(200).json(new ApiResponse(200, reviews, 'Reviews fetched successfully'));
});
//delete a review(Owner Only)
export const deleteReview = asyncHandler(async (req, res, next) => {
    const { reviewId } = req.params;
    const userId = req.user.id;
    const review = await db.review.findUnique({ where: { id: reviewId } });
    if (!review) {
        return next(new ApiError(404, 'Review not found'));
    }
    if (review.userId !== userId) {
        return next(new ApiError(403, 'You are not authorized to delete this review'));
    }
    const deletedReview = await db.review.delete({ where: { id: reviewId } });
    !deletedReview && next(new ApiError(500, 'Failed to delete review'));
    res.status(200).json(new ApiResponse(200, deletedReview, 'Review deleted successfully'));
    const user = await db.user.findUnique({ where: { id: userId } });
    const book = await db.book.findUnique({ where: { id: review.bookId } });
    const options = {
        email: user.email,
        subject: 'Review Deleted',
        mailGenContent: {
            body: {
                name: user.name,
                intro: 'You have successfully deleted your review.',
                table: {
                    data: [
                        {
                            Rating: review.rating,
                            Content: review.content,
                            Book: book.title
                        }
                    ]
                }
            }
        }
    };
    sendMail(options);
});
