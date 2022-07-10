import mongoose from "mongoose";
import Record from "../models/recordModel";
import { Request } from "express";

const createRecord = (Request: Request) => {
  const { desc, type, value, note } = Request.body;
  const record = new Record({
    _id: new mongoose.Types.ObjectId(),
    desc,
    type,
    value,
    note,
  });

  return record.save();
};

export default createRecord;
