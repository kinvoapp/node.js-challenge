import { Response } from "express";
const { v4: uuid } = require("uuid"); //todo check import
import Transaction from "../models/transaction";
// import { ITransaction } from "../types/transaction";
import { IRequest } from "../types/definition";

interface ITransaction {
  _id: string;
  title: string;
  value: number;
  created_datetime: Date;
}

const TransactionController = {
  async index({ res }: { req: Request; res: Response }) {
    try {
      const transactions = await Transaction.find();
      return res.status(200).json({ transactions });
    } catch (err) {
      return res.status(400).json(err); // TODO check error catch
    }
  },
  async store({
    req,
    res,
  }: {
    req: Request;
    res: Response;
  }): Promise<Response> {
    // const { title, value }: ITransaction = req.body;

    await Transaction.create(req.body)
      .then((data) => {
        return res.json(data);
      })
      .catch((err) => {
        return res.status(400).json(err.message);
      });
    return res.status(500);
  },

  async update(req: IRequest, res: Response): Promise<Response> {
    const { id } = req.params;
    const { title, value } = req.body;

    await Transaction.findByIdAndUpdate(id, {
      title: title,
      value: value,
    })
      .then((data) => {
        return res.json(data);
      })
      .catch((err) => {
        return res.status(400).json(err);
      });
    return res.status(500);
  },

  async delete(req: IRequest, res: Response): Promise<Response> {
    const { id } = req.params;

    await Transaction.findByIdAndDelete(id)
      .then((data) => {
        return res.json({ message: `${id} excluido com sucesso!` });
      })
      .catch((err) => {
        return res.status(400).json(err.message);
      });
    return res.status(500);
  },
};

export default TransactionController;
