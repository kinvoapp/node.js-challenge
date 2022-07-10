import Data from "../models/transaction";
import { Request } from "express";

const deleteData = (req: Request) => {
  return Data.findByIdAndDelete(req.params.id);
};

export default deleteData;
