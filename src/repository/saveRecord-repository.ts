import mongoose from "mongoose";
import Record from "../models/recordModel";
import { TransactionDTO } from "../DTO/transaction-DTO";

const createRecord = (data: TransactionDTO) => {
  const record = new Record({
    _id: new mongoose.Types.ObjectId(),
    ...data,
  });

  return record.save();
};

export default createRecord;
