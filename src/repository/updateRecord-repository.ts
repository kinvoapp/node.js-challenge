import Record from "../models/recordModel";
import { Request } from "express";

const updateRecord = (Request: Request) => {
  return Record.findByIdAndUpdate(Request.params.id, Request.body);
};

export default updateRecord;
