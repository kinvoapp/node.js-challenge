import express, { Request, Response } from 'express';
import getDaysInMonth from 'date-fns/getDaysInMonth';
import moment from 'moment';

import Move from '../models/Move';

const router = express.Router();

interface TypedRequestBody<T> extends Request {
    body: T;
};

router.post('/', async (req: TypedRequestBody<{ user: string, year: number, month: number }>, res: Response) => {
  try {
    const user = req.body.user;
    const year = req.body.year;
    const month = req.body.month;
    const days = getDaysInMonth(new Date(year, month));
    const start = moment(new Date(year, month, 1)).format('YYYY-MM-DD');

    const move = await Move.find({
      user: user,
      date: {
          $gte: new Date(start),
          $lt: new Date(year, month, days)
      }
    });

    if (!move) {
      res.status(422).json({ message: 'Record not found!' });
      return
    }

    res.status(200).json(move);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

router.post('/permonth', async (req: TypedRequestBody<{ user: string, year: number, month: number }>, res: Response) => {
  try {
 
    const user = req.body.user;
    const year = req.body.year;
    const month = req.body.month;
    const days = getDaysInMonth(new Date(year, month));
    const start = moment(new Date(year, month, 1)).format('YYYY-MM-DD');

    const move = await Move.aggregate([{ $match: { user: user, date: { $gte: new Date(start), $lt: new Date(year, month, days) } }},
                                       { $group: { _id: '$type', total: { $sum: '$value' }}}])
                            .sort({ '_id': -1});

    if (!move[0]) move[0] = { _id: 'Receita', total: 0 };
    if (!move[1]) move[1] = { _id: 'Despesa', total: 0 };
    move[2] = { _id: 'Saldo', total: move[0].total - move[1].total };
 
    if (!move) {
      res.status(422).json({ message: 'Record not found!' });
      return
    }

    res.status(200).json(move);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

router.post('/geral', async (req: TypedRequestBody<{ user: string }>, res: Response) => {
  try {
    const user = req.body.user;

    const move = await Move.aggregate([{ $match: { user: user }},
                                       { $group: { _id: '$type', total: { $sum: '$value' }}}])
                                      .sort({ '_id': -1});

    if (!move[0]) move[0] = { _id: 'Receita', total: 0 };
    if (!move[1]) move[1] = { _id: 'Despesa', total: 0 };
    move[2] = { _id: 'Saldo', total: move[0].total - move[1].total };

    if (!move) {
      res.status(422).json({ message: 'Record not found!' });
      return
    }

    res.status(200).json(move);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

export default router;
