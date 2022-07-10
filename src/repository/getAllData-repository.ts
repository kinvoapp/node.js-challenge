import Data from "../models/transaction";
import { Request } from "express";

const getAllData = (req: Request) => {
  return Data.find({});
};

export default getAllData;
