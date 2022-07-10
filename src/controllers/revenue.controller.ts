import { Request, Response } from "express";

const { revenueCreateService } = require("../services/revenue.service");

exports.revenueCreate = async (req: Request, res: Response): Promise<any> => {
  let revenue;
  try {
    revenue = await revenueCreateService(req.body);
  } catch (error) {
    return res.status(500);
  }

  return revenue.code
    ? res.status(revenue.code).json(revenue.message)
    : res.status(201).json(revenue);
};
