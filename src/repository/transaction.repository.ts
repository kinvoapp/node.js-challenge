import { TransactionDTO } from "../DTO/transaction-DTO";
import Record from "../models/recordModel";
import mongoose from "mongoose";

export class TransactionRepository {
  async saveRecord(data: TransactionDTO) {
    const record = new Record({
      _id: new mongoose.Types.ObjectId(),
      ...data,
    });
    const save = record.save();
    return save;
  }
}
