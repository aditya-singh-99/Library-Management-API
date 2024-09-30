import mongoose from "mongoose";

const connectLibraryDB = async () => {
    try {
        mongoose.libraryDB = await mongoose.createConnection(process.env.MONGO_LIBRARY_URI);
        console.log("Connected to Library Database");
    } catch (error) {
        throw (error);
    }
};

const connectTransactionsDB = async () => {
    try {
        mongoose.transactionsDB = await mongoose.createConnection(process.env.MONGO_TRANSACTIONS_URI);
        console.log("Connected to Transactions Database");
    } catch (error) {
        throw (error);
    }
};

export const connectDB = async () => {
    try {
        await connectLibraryDB();
        await connectTransactionsDB();
    } catch (error) {
        throw (error);
    }
};

export default mongoose;