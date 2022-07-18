import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  name: String,
  email: String,
  age: Number,
  gender: String,
});

export default model("User", UserSchema);
