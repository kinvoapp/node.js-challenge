import { Request } from "express";
import Record from "../models/recordModel";

const loadRecord = (Request: Request) => {
  const { startDate, endDate } = Request.params;

  return Record.find({
    createdAt: {
      $gte: `${startDate}T00:00:00.000Z`,
      $lt: `${endDate}T23:59:59.999Z`,
    },
  });
};

export default loadRecord;
