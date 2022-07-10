import { Request } from 'express';
import { addTime, getDateFormated } from '../../../utils/helper';

export const getAllFilter = (req: Request) => {
  const searchParameter: any = {};

  if (req.query.date) {
    const startAt = getDateFormated(String(req.query.date).split(',')[0]);
    const startEnd = getDateFormated(String(req.query.date).split(',')[1]);

    searchParameter.date = {
      $gte: startAt,
      $lt: addTime(startEnd, 20, 59, 59, 59),
    };
  }

  return searchParameter;
}