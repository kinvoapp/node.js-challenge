import { Document } from "mongoose";

export default interface IExpense extends Document {
  _id?: String;
  title: String;
  value: String;
}
