import { Revenue } from "../interfaces/revenue";
const { revenueModel } = require("../models/index.models");
const { revenueSchema } = require("./schemas");

exports.revenueCreateService = async (revenue: Revenue): Promise<object> => {
  const { error } = revenueSchema.validate(revenue);

  if (error) return { code: 400, message: error.message };

  const { title, value, date } = await revenueModel.create(revenue);

  return { title, value, date };
};
