import mongoose from "mongoose";

export const transactionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: "Enter a title",
  },
  value: {
    type: Number,
    required: "Enter a value",
  },
  transactionType: {
    type: String,
    required: "Enter a transaction type",
  },

  created_date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Transaction", transactionSchema);
