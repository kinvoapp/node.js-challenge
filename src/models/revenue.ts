import mongoose, { Schema } from "mongoose";
import IRevenue from "../types/IRevenue";

const revenueSchema: Schema = new mongoose.Schema(
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

export default mongoose.model<IRevenue>("Revenue", revenueSchema);
