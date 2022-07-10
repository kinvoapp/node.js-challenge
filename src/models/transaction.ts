import mongoose from "mongoose";
import ITransaction from "../types/ITransaction";

export const transactionSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

export default mongoose.model<ITransaction>("Transaction", transactionSchema);
