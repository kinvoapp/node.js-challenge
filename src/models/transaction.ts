import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    created_datetime: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", transactionSchema);
