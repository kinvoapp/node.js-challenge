import { Request, Response } from "express";

const {
  revenueCreateService,
  revenueGetAllService,
  revenueGetByIdService,
  revenueSrcForDatesService,
  revenueUpdateService,
  revenueDeleteService,
} = require("../services/revenue.service");

exports.revenueCreate = async (req: Request, res: Response): Promise<any> => {
  let revenues;
  try {
    revenues = await revenueCreateService(req.body);
  } catch (error) {
    return res.status(500);
  }

  return revenues.code
    ? res.status(revenues.code).json(revenues.message)
    : res.status(201).json(revenues);
};

exports.revenueGetAll = async (_req: Request, res: Response): Promise<any> => {
  let revenues;
  try {
    revenues = await revenueGetAllService();
  } catch (error) {
    return res.status(500);
  }

  return revenues.code
    ? res.status(revenues.code).json(revenues.message)
    : res.status(200).json(revenues);
};

exports.revenueGetById = async (req: Request, res: Response): Promise<any> => {
  const {
    params: { id },
  } = req;

  let revenue;
  try {
    revenue = await revenueGetByIdService(id);
  } catch (error) {
    return res.status(500);
  }

  return revenue.code
    ? res.status(revenue.code).json(revenue.message)
    : res.status(200).json(revenue);
};

exports.revenueSearchForDates = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { initialDate, finalDate } = req.body;

  let revenues;
  try {
    revenues = await revenueSrcForDatesService(initialDate, finalDate);
  } catch (error) {
    return res.status(500);
  }

  return revenues.code
    ? res.status(revenues.code).json(revenues.message)
    : res.status(200).json(revenues);
};

exports.revenueUpdate = async (req: Request, res: Response): Promise<any> => {
  const {
    params: { id },
  } = req;
  try {
    const update = await revenueUpdateService(id, req.body);

    return res.status(200).json(update);
  } catch (error) {
    return res.status(500);
  }
};

exports.revenueDelete = async (req: Request, res: Response): Promise<any> => {
  const {
    params: { id },
  } = req;

  try {
    const deleted = await revenueDeleteService(id);

    return res.status(200).json(deleted);
  } catch (error) {
    return res.status(500);
  }
};
