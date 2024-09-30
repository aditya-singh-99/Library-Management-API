import mongoose, { Schema } from "mongoose";

const transactionSchema = mongoose.Schema({
    book_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    book_name: {
        type: String,
        required: true
    },
    user_name: {
        type: String,
        required: true
    },
    user_email: {
        type: String,
        required: true
    },
    user_phone: {
        type: String,
        required: true
    },
    issue_date: {
        type: Date,
        default: Date.now
    },
    return_date: {
        type: Date
    },
    total_rent: {
        type: Number,
        default: 0
    }
});

export default transactionSchema;
