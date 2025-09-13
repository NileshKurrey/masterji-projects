import express from 'express'
import { bookCreationValidator } from '../validator/index.js'
import  {validate}  from '../middlewares/validator.middleware.js'
import { isUserLoggedIn } from '../middlewares/UserValidator.middleware.js'
import {createBook,getAllBooks,getBookById,getBooksByAuthor,getBooksByCategory,getBooksByTitle,getBooksByPriceRange,getBooksByUser,getCartItems,updateBook,deleteBook,} from '../controllers/Books.controller.js'

const BookRoutes = express.Router()
BookRoutes.post('/createBook',isUserLoggedIn,bookCreationValidator(),validate, createBook)
BookRoutes.get('/getAllBooks', getAllBooks)
BookRoutes.get('/getBookById/:id', getBookById)
BookRoutes.get('/getBooksByUser',isUserLoggedIn, getBooksByUser)
BookRoutes.get('/getBooksByAuthor', getBooksByAuthor)
BookRoutes.get('/getBooksByTitle', getBooksByTitle)
BookRoutes.get('/getBooksByPriceRange', getBooksByPriceRange)
BookRoutes.get('/getBooksByCategory', getBooksByCategory)
BookRoutes.get('/getCartItems',isUserLoggedIn, getCartItems)
BookRoutes.put('/updateBook/:id',isUserLoggedIn, updateBook)
BookRoutes.delete('/deleteBook/:id',isUserLoggedIn, deleteBook)

export default BookRoutes