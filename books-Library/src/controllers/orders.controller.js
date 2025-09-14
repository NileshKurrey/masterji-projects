import { ApiError } from "../libs/api-error.js";
import { ApiResponse } from "../libs/api-response.js";
import { asyncHandler } from "..//libs/asyncHandler.js";
import { db } from "../libs/db.js";
import { sendMail } from "../libs/mails.js";

//place a order
export const placeOrder = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { bookIds } = req.body;
    if (!bookIds || bookIds.length === 0) {
        return next(new ApiError(400, 'Book IDs are required'));
    }
    const books = await db.book.findMany({
        where: { id: { in: bookIds } }
    });
    if (books.length !== bookIds.length) {
        return next(new ApiError(404, 'One or more books not found'));
    }
    const totalPrice = books.reduce((sum, book) => sum + book.price, 0);
    const newOrder = await db.order.create({
        data: {
            userId,
            totalPrice,
            books: books
        },
    });
    !newOrder && next(new ApiError(500, 'Failed to place order'));
    res.status(201).json(new ApiResponse(201, newOrder, 'Order placed successfully'));
    const options = {
        email: req.user.email,
        subject: 'Order Placed Successfully',
        mailGenContent: {
            body: {
                name: req.user.name,
                intro: 'Your order has been placed successfully.',
                table: {
                    data: books.map(book => ({
                        Title: book.title,
                        Author: book.author,
                        Price: book.price
                    }))
                },
                outro: `Total Amount: $${totalAmount}`
            }
        }
    };

    sendMail(options);
});


//list users orders
export const listUserOrders = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const orders = await db.order.findMany({
        where: { userId },
        include: { books: true }
    });
    res.status(200).json(new ApiResponse(200, orders, 'Orders fetched successfully'));
});

//get order details
export const getOrderDetails = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { orderId } = req.params;
    const order = await db.order.findUnique({
        where: { id: orderId, userId },
        include: { books: true }
    });
    if (!order) {
        return next(new ApiError(404, 'Order not found'));
    }
    res.status(200).json(new ApiResponse(200, order, 'Order fetched successfully'));
});
