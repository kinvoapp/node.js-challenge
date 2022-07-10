import { Request, Response, NextFunction } from "express";
import {
  saveData,
  getData,
  getAllData,
  updateData,
  deleteData,
  amount,
} from "../repository";
import { calculate } from "../utils/calcAmount";

const RevenueController = {
  async getAllRevenues(req: Request, res: Response, next: NextFunction) {
    getAllData
      .getAllDataRevenue(req)
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch((error) => {
        return res.status(500).json(error);
      });
  },

  async getRevenueByDate(req: Request, res: Response, next: NextFunction) {
    getData
      .getDataRevenue(req)
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch((error) => {
        return res.status(500).json(error);
      });
  },

  async createRevenue(req: Request, res: Response, next: NextFunction) {
    saveData
      .saveDataRevenue(req)
      .then((data) => {
        return res.status(201).json(data);
      })
      .catch((error) => {
        return res.status(500).json(error);
      });
  },

  async updateRevenue(req: Request, res: Response) {
    updateData
      .updateDataRevenue(req)
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch((error) => {
        return res.status(500).json(error);
      });
  },

  async deleteRevenue(req: Request, res: Response) {
    deleteData
      .deleteRevenue(req)
      .then(() => {
        return res.status(200).json({ message: "Data deleted successfully" });
      })
      .catch((error) => {
        return res.status(500).json(error);
      });
  },

  async getAmount(req: Request, res: Response, next: NextFunction) {
    amount.amountRevenue().then((data) => {
      res.status(200).json({ balance: calculate(data) });
    });
  },
};

export default RevenueController;
