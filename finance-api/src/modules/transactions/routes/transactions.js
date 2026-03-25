import express from "express";
import prisma from "../../../lib/prisma.js";

const router = express.Router();

// CREATE
router.post("/", async (req, res, next) => {
  try {
    const { title, amount, type, date } = req.body;

    if (
      !title ||
      title.trim() === "" ||
      !amount ||
      !date ||
      date.trim() === ""
    ) {
      const error = new Error("There is an empty field");
      error.status = 400;
      throw error;
    }

    if (type !== "income" && type !== "expense") {
      const error = new Error("Type field must be 'income' or 'expense'");
      error.status = 400;
      throw error;
    }
    const transaction = await prisma.transaction.create({
      data: {
        title,
        amount: parseFloat(amount),
        type,
        date: new Date(date),
      },
    });
    res.status(201).json(transaction);
  } catch (err) {
    next(err);
  }
});

// READ ALL
router.get("/", async (req, res, next) => {
  try {
    // get query params, default page=1 and limit=10
    const { startDate, endDate, page = 1, limit = 10 } = req.query;

    // build date filter only if params are provided
    const dateFilter = {};
    if (startDate) dateFilter.gte = new Date(startDate);
    if (endDate) dateFilter.lte = new Date(endDate);

    // calculate how many records to skip
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const transactions = await prisma.transaction.findMany({
      where: {
        date: Object.keys(dateFilter).length ? dateFilter : undefined,
      },
      skip,
      take: parseInt(limit),
      orderBy: { date: "desc" },
    });

    // count total records for pagination
    const total = await prisma.transaction.count({
      where: {
        date: Object.keys(dateFilter).length ? dateFilter : undefined,
      },
    });

    res.status(200).json({
      data: transactions,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (err) {
    next(err);
  }
});

// READ ONE
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const transaction = await prisma.transaction.findUnique({
      where: { id: parseInt(id) },
    });
    if (!transaction) {
      const error = new Error("Transaction not found");
      error.status = 404;
      throw error;
    }
    res.status(200).json(transaction);
  } catch (err) {
    next(err);
  }
});

// UPDATE
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, amount, type, date } = req.body;

    if (
      !title ||
      title.trim() === "" ||
      !amount ||
      !date ||
      date.trim() === ""
    ) {
      const error = new Error("There is an empty field");
      error.status = 400;
      throw error;
    }

    if (type !== "income" && type !== "expense") {
      const error = new Error("Type field must be 'income' or 'expense'");
      error.status = 400;
      throw error;
    }

    const transaction = await prisma.transaction.update({
      where: { id: parseInt(id) },
      data: {
        title,
        amount: parseFloat(amount),
        type,
        date: new Date(date),
      },
    });
    res.status(200).json(transaction);
  } catch (err) {
    next(err);
  }
});

// DELETE
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    await prisma.transaction.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

export default router;
