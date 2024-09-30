import express from "express";
import "dotenv/config";
import "./db/connectDB.js";
import cors from "cors";
import mongoose, { connectDB } from "./db/connectDB.js";
import userSchema from "./models/user-model.js";
import bookSchema from "./models/book-model.js";
import transactionSchema from "./models/transaction-model.js";
import router from "./routes/routes.js";
import routeNotFound from "./middlewares/routeNotFound-middleware.js";
import errorHandler from "./middlewares/errorHandler-middleware.js";

const app = express();
const startServer = async () => {
    try {
        await connectDB();
        const User = mongoose.libraryDB.model('User', userSchema);
        const Book = mongoose.libraryDB.model('Book', bookSchema);
        const Transaction = mongoose.transactionsDB.model('Transaction', transactionSchema);

        app.use((req, res, next) => {
            req.User = User;
            req.Book = Book;
            req.Transaction = Transaction;
            next();
        });

        app.use(cors());
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));

        app.use('/', router);

        app.use(routeNotFound);
        app.use(errorHandler);

        const port = process.env.PORT || 4000;
        app.listen(port, () => {
            console.log(`Server is listening on Port: ${port}`);
        });
    } catch (error) {
        console.error("Error connecting to databases:", error.stack);
    }
}
startServer();

// const users = [
//     {
//         name: "John Doe",
//         email: "john.doe@example.com",
//         phone: "1234567890"
//     },
//     {
//         name: "Jane Smith",
//         email: "jane.smith@example.com",
//         phone: "9876543210"
//     },
//     {
//         name: "Alice Johnson",
//         email: "alice.johnson@example.com",
//         phone: "1112223333"
//     },
//     {
//         name: "Bob Brown",
//         email: "bob.brown@example.com",
//         phone: "4445556666"
//     },
//     {
//         name: "Charlie White",
//         email: "charlie.white@example.com",
//         phone: "7778889999"
//     }
// ]
// const books = [
//     {
//         name: "The Great Gatsby",
//         category: "Fiction",
//         rent: 5
//     },
//     {
//         name: "To Kill a Mockingbird",
//         category: "Fiction",
//         rent: 4
//     },
//     {
//         name: "1984",
//         category: "Dystopian",
//         rent: 6
//     },
//     {
//         name: "Pride and Prejudice",
//         category: "Romance",
//         rent: 4
//     },
//     {
//         name: "Moby Dick",
//         category: "Adventure",
//         rent: 7
//     },
//     {
//         name: "The Catcher in the Rye",
//         category: "Fiction",
//         rent: 5
//     },
//     {
//         name: "The Hobbit",
//         category: "Fantasy",
//         rent: 6
//     },
//     {
//         name: "War and Peace",
//         category: "Historical",
//         rent: 8
//     },
//     {
//         name: "Brave New World",
//         category: "Dystopian",
//         rent: 5
//     },
//     {
//         name: "The Odyssey",
//         category: "Epic",
//         rent: 7
//     },
//     {
//         name: "Crime and Punishment",
//         category: "Mystery",
//         rent: 6
//     },
//     {
//         name: "The Lord of the Rings",
//         category: "Fantasy",
//         rent: 8
//     },
//     {
//         name: "The Divine Comedy",
//         category: "Epic",
//         rent: 6
//     },
//     {
//         name: "Anna Karenina",
//         category: "Romance",
//         rent: 5
//     },
//     {
//         name: "Don Quixote",
//         category: "Adventure",
//         rent: 7
//     },
//     {
//         name: "Hamlet",
//         category: "Tragedy",
//         rent: 4
//     },
//     {
//         name: "The Iliad",
//         category: "Epic",
//         rent: 7
//     },
//     {
//         name: "Frankenstein",
//         category: "Horror",
//         rent: 5
//     },
//     {
//         name: "Dracula",
//         category: "Horror",
//         rent: 6
//     },
//     {
//         name: "The Picture of Dorian Gray",
//         category: "Gothic",
//         rent: 4
//     }
// ]