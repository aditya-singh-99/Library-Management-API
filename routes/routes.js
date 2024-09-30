import express from 'express';
import { getAllUsers } from '../controllers/users-controller.js';
import { getAllBooks, searchBooks } from '../controllers/books-controller.js';
import { completeTransaction, createTransaction, getIssuedBooks, getTotalRentByBook, getTransactionsInRange, getUserTransactions } from '../controllers/transactions-controller.js';

const router = express.Router();

router.get('/users/all', getAllUsers);
router.get('/books/all', getAllBooks);
router.get('/books/search', searchBooks);

router.post('/transactions/issue', createTransaction);
router.post('/transactions/return', completeTransaction);

router.get('/transactions/issued', getIssuedBooks);
router.get('/transactions/book', getTotalRentByBook);
router.get('/transactions/user', getUserTransactions);
router.get('/transactions/range', getTransactionsInRange);

export default router;