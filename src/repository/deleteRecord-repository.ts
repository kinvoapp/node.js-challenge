import Record from "../models/recordModel";
import { Request } from "express";

const deleteRecord = (Request: Request) => {
  return Record.findByIdAndDelete(Request.params.id);
};

export default deleteRecord;
