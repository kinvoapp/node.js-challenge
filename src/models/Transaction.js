import { Schema, model } from "mongoose";

const TransactionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  description: String,
  type: String,
  value: Number,
});

export default model("Transaction", TransactionSchema);
