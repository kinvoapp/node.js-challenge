import mongoose from "mongoose";
import Data from "../models/transaction";
import { Request } from "express";

const saveData = (req: Request) => {
  const { title, transactionType, value } = req.body;
  const newData = new Data({
    _id: new mongoose.Types.ObjectId(),
    title,
    transactionType,
    value,
  });
  return newData.save();
};

export default saveData;
