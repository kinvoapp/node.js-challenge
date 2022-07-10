import Data from "../models/transaction";
import { Request } from "express";

const getData = (req: Request) => {
  const { beginDate, endDate } = req.params;

  return Data.find({
    createdAt: {
      $gte: `${beginDate}T00:00:00.000Z`,
      $lt: `${endDate}T23:59:59.999Z`,
    },
  });
};

export default getData;
