import { Document } from "mongoose";

export default interface ITransaction extends Document {
  _id?: String;
  title: String;
  transactionType: String;
  value: Number;
}
