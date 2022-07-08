import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
  balance: {
    type: Number,
  },
});

export default mongoose.model("Account", accountSchema);
