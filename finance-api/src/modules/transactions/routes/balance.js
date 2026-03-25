import express from "express";
import prisma from "../../../lib/prisma.js";
const router = express.Router();

// CREATE
router.get("/", async (req, res, next) => {
  try {
    const income = await prisma.transaction.aggregate({
      _sum: { amount: true },
      where: { type: "income" },
    });
    const expense = await prisma.transaction.aggregate({
      _sum: { amount: true },
      where: { type: "expense" },
    });
    // sums all the income
    const totalIncome = income._sum.amount || 0;
    // sums all the expens
    const totalExpense = expense._sum.amount || 0;

    const balance = totalIncome - totalExpense;
    res.status(200).json({
      income: totalIncome,
      expense: totalExpense,
      balance,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
