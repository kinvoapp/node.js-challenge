import mongoose from "mongoose";
import Data from "../models";
import { Request } from "express";

const saveDataRevenue = (req: Request) => {
  const { title, value } = req.body;
  const newData = new Data.revenue({
    _id: new mongoose.Types.ObjectId(),
    title,
    value,
  });
  return newData.save();
};

const saveDataExpense = (req: Request) => {
  const { title, value } = req.body;
  const newData = new Data.expense({
    _id: new mongoose.Types.ObjectId(),
    title,
    value,
  });
  return newData.save();
};

export default {
  saveDataRevenue,
  saveDataExpense,
};
