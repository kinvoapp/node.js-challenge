import { Revenue } from "../interfaces/revenue";
const { revenueModel } = require("../models/index.models");
const { revenueSchema } = require("./schemas");

exports.revenueCreateService = async (revenue: Revenue): Promise<object> => {
  const { error } = revenueSchema.validate(revenue);

  if (error) return { code: 400, message: error.message };

  const revenues = await revenueModel.find();

  const newId = revenue.id ? revenue.id : revenues.length + 1;

  const { title, value, date, id } = await revenueModel.create({
    ...revenue,
    id: newId,
  });

  return { title, value, date, id };
};

exports.revenueGetAllService = async (): Promise<object> => {
  const revenues = await revenueModel.find();

  return revenues;
};

exports.revenueGetByIdService = async (id: number): Promise<object> => {
  const revenues = await revenueModel.find({ id });

  return revenues;
};

exports.revenueSrcForDatesService = async (
  initialDate: string,
  finalDate: string
): Promise<object> => {
  const revenues = await revenueModel.find({
    date: {
      $gte: initialDate,
      $lte: finalDate,
    },
  });

  return revenues;
};

exports.revenueUpdateService = async (
  id: number,
  revenue: object
): Promise<object> => {
  const updated = await revenueModel.findOneAndUpdate(id, revenue);

  return updated;
};

exports.revenueDeleteService = async (id: number): Promise<object> => {
  const deleted = await revenueModel.deleteOne({ id });

  return deleted;
};
