import { Request, Response } from "express";
import Account from "../models/account";
import { IAccount } from "../types/IAccount";

const AccountController = {
  async getAllAccounts(req: Request, res: Response) {
    Account.find({}, (err: Error, account: IAccount) => {
      if (err) {
        res.status(400).send(err);
      }
      res.json(account);
    });
  },

  async getAccountById(req: Request, res: Response) {
    Account.findById(req.params.id, (err: Error, account: IAccount) => {
      if (err) {
        res.status(404).send(err);
      }
      res.json(account);
    });
  },

  async createAccount(req: Request, res: Response) {
    let newAccount = new Account(req.body);

    newAccount.save((err, account) => {
      if (err) {
        res.status(500).send(err);
      }
      res.json(account);
    });
  },

  async updateAccount(req: Request, res: Response) {
    Account.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true },
      (err, account) => {
        if (err) {
          res.status(500).send(err);
        }
        res.json(account);
      }
    );
  },

  async deleteAccount(req: Request, res: Response) {
    Account.remove({ _id: req.params.id }, (err: Error) => {
      if (err) {
        res.send(err);
      }
      res.json({ message: "Successfully deleted Account" });
    });
  },
};

export default AccountController;
