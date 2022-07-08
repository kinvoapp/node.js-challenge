import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
  },
});

export default mongoose.model("Account", accountSchema);
