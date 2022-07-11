import { Request } from 'express';
import { Decimal128 } from 'mongoose';
import { IControllerPagination } from '../interfaces/IControllerPagination';

export const controllerPagination = (req: Request): IControllerPagination => {
  return {
    offset: Number(req.query.offset) || 0,
    limit: Number(req.query.limit) || 0,
  }
}

export const getDateFormated = (date: any) =>
  new Date(`${Number(date.split('/')[2])}-${Number(date.split('/')[1])}-${Number(date.split('/')[0])}`);

export const addTime = (date: Date, hours: number, minutes: number, seconds: number, milliseconds: number) => {
  date.setHours(hours);
  date.setMinutes(minutes);
  date.setSeconds(seconds);
  date.setMilliseconds(milliseconds);

  return date;
}

export const getDecimal = (value: Decimal128) => parseFloat(String(value));