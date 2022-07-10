import { Request } from 'express';
import { isFormOfPayment } from '../../../enumerators/FormOfPaymentEnum';
import { isMovementType } from '../../../enumerators/MovementTypeEnum';
import { addTime, getDateFormated } from '../../../utils/helper';

export const getAllFilter = (req: Request) => {
  const searchParameter: any = {};

  if (req.query.type && isMovementType(Number(req.query.type))) {
    searchParameter.type = req.query.type;
  }

  if (req.query.formOfPayment && isFormOfPayment(Number(req.query.formOfPayment))) {
    searchParameter.formOfPayment = req.query.formOfPayment;
  }

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