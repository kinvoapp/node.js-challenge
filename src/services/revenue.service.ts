import { Revenue } from "../interfaces/revenue";
const { revenueModel } = require("../models/index.models");
const { revenueSchema } = require("./schemas");

exports.revenueCreateService = async (revenue: Revenue): Promise<object> => {
  const { error } = revenueSchema.validate(revenue);

  if (error) return { code: 400, message: error.message };

  const { title, value, date } = await revenueModel.create(revenue);

  return { title, value, date };
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
