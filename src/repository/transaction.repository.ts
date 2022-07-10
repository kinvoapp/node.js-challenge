import { TransactionDTO } from "../DTO/transaction-DTO";
import Record from "../models/recordModel";
import mongoose from "mongoose";

export class TransactionRepository {
  findById(id: string) {
    const count = Record.countDocuments({ _id: id });
    if (count != 0) return true;
  }
  saveRecord(data: TransactionDTO) {
    const record = new Record({
      _id: new mongoose.Types.ObjectId(),
      ...data,
    });
    const save = record.save();
    return save;
  }

  updateRecord(id: string, data: TransactionDTO) {
    return Record.findByIdAndUpdate(id, data);
  }

  deleteRecord(id: string) {
    return Record.findByIdAndDelete(id);
  }

  loadRecord(startDate: string, endDate: string, limit?: string) {
    return Record.find({
      createdAt: {
        $gte: `${startDate}T00:00:00.000Z`,
        $lt: `${endDate}T23:59:59.999Z`,
      },
    }).limit(parseInt(limit) || 5);
  }

  getBalance() {
    return Record.find();
  }
}
