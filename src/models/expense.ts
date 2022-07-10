import mongoose, { Schema } from "mongoose";
import IExpense from "../types/IExpense";

const expenseSchema: Schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: "Enter a title",
    },
    value: {
      type: Number,
      required: "Enter a value",
    },
  },
  { timestamps: true }
);

export default mongoose.model<IExpense>("Expense", expenseSchema);
