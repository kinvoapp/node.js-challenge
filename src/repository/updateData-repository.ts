import Data from "../models/transaction";
import { Request } from "express";

const updateData = (req: Request) => {
  return Data.findByIdAndUpdate(req.params.id, req.body);
};

export default updateData;
