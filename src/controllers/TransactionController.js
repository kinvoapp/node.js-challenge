import Transaction from "../models/Transaction";
import User from "../models/User";
import mongoose from "mongoose";
import * as Yup from "yup";
const ObjectId = mongoose.Types.ObjectId;

class TransactionController {
  async show(req, res) {
    const { page, description, type, minvalue, maxvalue } = req.query;
    const { user_id } = req.headers;
    const where = { user: user_id };

    if (!user_id) {
      return res.status(401).json({ Error: "Login required." });
    }

    if (description) {
      where.description = description;
    }
    if (type) {
      where.type = type;
    }
    if (minvalue) {
      where.value = { $gte: minvalue };
    }
    if (maxvalue) {
      where.value = { $lte: maxvalue };
    }
    if (minvalue && maxvalue) {
      where.value = { $gte: minvalue, $lte: maxvalue };
    }
    if (page < 1) {
      page = 1;
    }

    const transaction = await Transaction.find(where)
      .populate("user")
      .skip((page - 1) * 3)
      .limit(3);

    return res.json(transaction);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
      type: Yup.string().required(),
      value: Yup.number().required(),
    });
    const { description, type, value } = req.body;
    const { user_id } = req.headers;

    if (!user_id) {
      return res.status(401).json({ Error: "Login required." });
    }

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ Error: "Validation failure." });
    }

    const transaction = await Transaction.create({
      user: user_id,
      description,
      type,
      value,
    });
    return res.status(201).json(transaction);
  }

  async update(req, res) {
    const { id_transaction } = req.params;
    const { description, type, value } = req.body;
    const { user_id } = req.headers;

    if (!user_id) {
      return res.status(401).json({ Error: "Login required." });
    }

    const user = await User.findById(user_id);
    const transaction = await Transaction.findById(id_transaction);

    if (String(user._id) !== String(transaction.user)) {
      return res.status(403).json({
        Error: "It is not allowed to update a transaction of another user.",
      });
    }

    const transactions = await Transaction.updateOne(
      { _id: id_transaction },
      {
        description,
        type,
        value,
      }
    );
    return res.json({ message: "Transaction has been updated." });
  }

  async destroy(req, res) {
    const { transaction_id } = req.body;
    const { user_id } = req.headers;
    const user = await User.findById(user_id);
    const transaction = await Transaction.findById(transaction_id);

    if (String(user._id) !== String(transaction.user)) {
      return res.status(403).json({
        Error: "It is not allowed to delete a transaction of another user.",
      });
    }

    await Transaction.findByIdAndDelete({ _id: transaction_id });

    return res.json({ message: "Transaction has been deleted." });
  }

  async balance(req, res) {
    const { user_id } = req.headers;

    if (!user_id) {
      return res.status(401).json({ Error: "Login required." });
    }

    const balance = await Transaction.aggregate([
      { $match: { user: ObjectId(user_id) } },
      {
        $group: {
          _id: user_id,
          balance: { $sum: "$value" },
        },
      },
    ]);

    return res.json(balance);
  }
}

export default new TransactionController();
