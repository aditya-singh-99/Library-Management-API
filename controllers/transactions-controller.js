
export const createTransaction = async (req, res, next) => {
    try {
        const { name, email, phone, title } = req.body;
        const user = await req.User.findOne({ name, email, phone });
        const book = await req.Book.findOne({ name: title });
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        if (!book) {
            return res.status(404).json({ msg: 'Book not found' });
        }
        const transaction = {
            book_id: book._id,
            user_id: user._id,
            book_name: book.name,
            user_name: user.name,
            user_email: user.email,
            user_phone: user.phone
        };
        const newTransaction = new req.Transaction(transaction);
        await newTransaction.save();
        res.status(200).json(newTransaction);
    } catch (error) {
        next(error);
    }
};

export const completeTransaction = async (req, res, next) => {
    try {
        const { name, email, phone, title } = req.body;
        const query = {
            book_name: title,
            user_name: name,
            user_email: email,
            user_phone: phone,
            return_date: null,
        };
        const transaction = await req.Transaction.findOne(query);
        if (!transaction) {
            return res.status(404).json({ msg: 'No active transaction found for this book and user' });
        }
        const returnDate = new Date();
        transaction.return_date = returnDate;
        const rentDays = Math.ceil((returnDate - transaction.issue_date) / (1000 * 60 * 60 * 24));
        const book = await req.Book.findById(transaction.book_id);
        if (!book) {
            return res.status(404).json({ msg: 'Book details not found' });
        }
        transaction.total_rent = rentDays * book.rent;
        await transaction.save();
        res.status(200).json(transaction);
    } catch (error) {
        next(error);
    }
};

export const getIssuedBooks = async (req, res, next) => {
    try {
        const { title } = req.query;
        if (!title) {
            return res.status(400).json({ msg: 'Book name is required' });
        }
        const transactions = await req.Transaction.find({ book_name: title });
        if (transactions.length === 0) {
            return res.status(404).json({ msg: 'No transactions found for this book' });
        }
        res.status(200).json(transactions);
    } catch (error) {
        next(error);
    }
};

export const getTotalRentByBook = async (req, res, next) => {
    try {
        const { title } = req.query;
        if (!title) {
            return res.status(400).json({ msg: 'Book name is required' });
        }
        const book = await req.Book.findOne({ name: title });
        if (!book) {
            return res.status(404).json({ msg: 'Book not found' });
        }
        const transactions = await req.Transaction.find({ book_name: book.name, return_date: { $ne: null } });
        let total_rent = 0;
        transactions.forEach(transaction => {
            total_rent += transaction.total_rent;
        });
        res.status(200).json({ total_rent });
    } catch (error) {
        next(error);
    }
};

export const getUserTransactions = async (req, res, next) => {
    try {
        const { email } = req.query;
        if (!email) {
            return res.status(400).json({ msg: 'Email is required' });
        }
        const transactions = await req.Transaction.find({ user_email: email });
        if (transactions.length === 0) {
            return res.status(404).json({ msg: 'No transactions found' });
        }
        res.status(200).json(transactions);
    } catch (error) {
        next(error);
    }
};

export const getTransactionsInRange = async (req, res, next) => {
    try {
        const { startDate, endDate } = req.query;
        if (!startDate || !endDate) {
            return res.status(400).json({ msg: 'Start or End Date is missing' });
        }
        const start = new Date(startDate);
        const end = new Date(endDate);
        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            return res.status(400).json({ msg: 'Invalid Start or End Date' });
        }
        start.setHours(0, 0, 0, 0);
        end.setHours(23, 59, 59, 999);
        const transactions = await req.Transaction.find({
            issue_date: { $gte: start, $lte: end }
        });
        if (transactions.length === 0) {
            return res.status(404).json({ msg: 'No transactions found' });
        }
        res.status(200).json(transactions);
    } catch (error) {
        next(error);
    }
};
