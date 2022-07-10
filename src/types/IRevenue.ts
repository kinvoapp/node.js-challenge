import { Document } from "mongoose";

export default interface IRevenue extends Document {
  _id?: String;
  title: String;
  value: Number;
}
