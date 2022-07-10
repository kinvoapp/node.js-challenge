import { Document } from "mongoose";
export default interface ITransaction extends Document {
  desc: string;
  type: string;
  value: number;
  note: string;
}
