import { ApiError } from "../libs/api-error.js";
import { ApiResponse } from "../libs/api-response.js";
import { asyncHandler } from "../libs/asyncHandler.js";
import { db } from "../libs/db.js";
import { sendMail } from "../libs/mails.js";

// Create a new book - only by logged in user
export const createBook = asyncHandler(async (req, res, next) => {
    const { title, author, description, price, category, image } = req.body;
    const userId = req.user.id;

    if (!title || !author || !description || !price || !category) {
        return next(new ApiError(400, 'All fields are required'));
    }
    const newBook = await db.book.create({
        data: {
            title,  
            author,
            description,
            image,
            price,
            category,
            userId
        }
    });
    !newBook && next(new ApiError(500, 'Failed to create book'));
    res.status(201).json(new ApiResponse(201, newBook, 'Book created successfully'));
    const options = {
        email: req.user.email,
        subject: 'New Book Created',
        mailGenContent: {
            body: {
                name: req.user.name,
                intro: 'You have successfully created a new book.',
                table: {
                    data: [
                        {
                            Title: title,
                            Author: author,
                            Description: description,
                            Price: price,
                            Category: category,
                            Image: image
                        }
                    ]
                }
            }
        }
    };
    sendMail(options);

});

// Get all books with pagination and filtering
export const getAllBooks = asyncHandler(async (req, res, next) => {
    let { page = 1, limit = 10, category, author, minPrice, maxPrice } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    const skip = (page - 1) * limit;    
    const filter = {};

    if (category) filter.category = category;
    if (author) filter.author = author;
    if (minPrice || maxPrice) filter.price = {};
    if (minPrice) filter.price.gte = parseFloat(minPrice);
    if (maxPrice) filter.price.lte = parseFloat(maxPrice);
    const books = await db.book.findMany({
        where: filter,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' }
    });
    !books && next(new ApiError(500, 'Failed to fetch books'));
    res.status(200).json(new ApiResponse(200, books, 'Books fetched successfully'));
});
// Get a single book by ID
export const getBookById = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const book = await db.book.findUnique({
        where: { id },
        include: { reviews: true }
    });
    !book && next(new ApiError(404, 'Book not found'));
    res.status(200).json(new ApiResponse(200, book, 'Book fetched successfully'));
});

// Update a book - only by the user who created it
export const updateBook = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { title, author, description, price, category } = req.body;
    const userId = req.user.id;
    const book = await db.book.findUnique({ where: { id } });
    if (!book) return next(new ApiError(404, 'Book not found'));
    if (book.userId !== userId) return next(new ApiError(403, 'You are not authorized to update this book'));
    const updatedBook = await db.book.update({
        where: { id },
        data: { title, author, description, price, category }
    });
    !updatedBook && next(new ApiError(500, 'Failed to update book'));
    res.status(200).json(new ApiResponse(200, updatedBook,'Book updated successfully'));

    const options = {
        email: req.user.email,
        subject: 'Book Updated',
        mailGenContent: {
            body: {
                name: req.user.name,
                intro: 'You have successfully updated your book.',
                table: {
                    data: [
                        {
                            Title: title || book.title,
                            Author: author || book.author,
                            Description: description || book.description,
                            Price: price || book.price,
                            Category: category || book.category,
                            Image: image || book.image
                        }
                    ]
                }
            }
        }
    };
    sendMail(options);
});
// Delete a book - only by the user who created it
export const deleteBook = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const userId = req.user.id;
    const book = await db.book.findUnique({ where: { id } });
    if (!book) return next(new ApiError(404, 'Book not found'));
    if (book.userId !== userId) return next(new ApiError(403, 'You are not authorized to delete this book'));
    await db.book.delete({ where: { id } });
    res.status(200).json(new ApiResponse(200, null, 'Book deleted successfully'));

    const options = {
        email: req.user.email,
        subject: 'Book Deleted',
        text: `You have successfully deleted the book: ${book.title}`,
        mailGenContent: {
            body: {
                name: req.user.name,
                intro: `You have successfully deleted the book: ${book.title}`,
            }
        }
        
    };
    sendMail(options);
});

// get all books added by a specific user
export const getBooksByUser = asyncHandler(async (req, res, next) => {
    const userId = req.user.id;
    const books = await db.book.findMany({ where: { userId } });
    !books && next(new ApiError(500, 'Failed to fetch books'));
    res.status(200).json(new ApiResponse(200, books, 'Books fetched successfully'));
});
// get book by author name
export const getBooksByAuthor = asyncHandler(async (req, res, next) => {
    const { author } = req.query;
    if (!author) return next(new ApiError(400, 'Author name is required'));
    const books = await db.book.findMany({ where: { author } });
    !books && next(new ApiError(500, 'Failed to fetch books'));
    res.status(200).json(new ApiResponse(200, books, 'Books fetched successfully'));
});
// get book by title
export const getBooksByTitle = asyncHandler(async (req, res, next) => {
    const { title } = req.query;
    if (!title) return next(new ApiError(400, 'Title is required'));
    const books = await db.book.findMany({ where: { title } });
    !books && next(new ApiError(500, 'Failed to fetch books'));
    res.status(200).json(new ApiResponse(200, books, 'Books fetched successfully'));
});
// get books within a price range
export const getBooksByPriceRange = asyncHandler(async (req, res, next) => {
    const { min, max } = req.query;
    if (!min || !max) return next(new ApiError(400, 'Price range is required'));
    const books = await db.book.findMany({
        where: {
            AND: [
                { price: { gte: Number(min) } },
                { price: { lte: Number(max) } }
            ]
        }
    });
    !books && next(new ApiError(500, 'Failed to fetch books'));
    res.status(200).json(new ApiResponse(200, books, 'Books fetched successfully'));
});
// get books by category
export const getBooksByCategory = asyncHandler(async (req, res, next) => {
    const { category } = req.query;
    if (!category) return next(new ApiError(400, 'Category is required'));
    const books = await db.book.findMany({ where: { category } });
    !books && next(new ApiError(500, 'Failed to fetch books'));
    res.status(200).json(new ApiResponse(200, books, 'Books fetched successfully'));
});
// Add to cart book
export const addToCart = asyncHandler(async (req, res, next) => {
    const { bookId } = req.body;
    const userId = req.user.id;
    if (!bookId) return next(new ApiError(400, 'Book ID is required'));
    const book = await db.book.findUnique({ where: { id: bookId } });
    if (!book) return next(new ApiError(404, 'Book not found'));
    const cartItem = await db.cart.create({
        data: {
            userId,
            bookId
        }
    });
    res.status(201).json(new ApiResponse(201, cartItem, 'Book added to cart successfully'));
});
// Get cart items for a user
export const getCartItems = asyncHandler(async (req, res, next) => {
    const userId = req.user.id;
    const cartItems = await db.cart.findMany({
        where: { userId },
        include: { book: true }
    });
    !cartItems && next(new ApiError(500, 'Failed to fetch cart items'));
    res.status(200).json(new ApiResponse(200, cartItems, 'Cart items fetched successfully'));
});
