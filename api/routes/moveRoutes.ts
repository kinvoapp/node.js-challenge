import express, { Request, Response } from 'express';

import Move from '../models/Move';

const router = express.Router();

interface TypedRequestBody<T> extends Request {
    body: T;
}

router.post('/', async (req: TypedRequestBody<{ user: string, name: string, type: string, value: number, date: Date, desc: string }>, res: Response) => {
    const { user, name, type, value, date, desc } = req.body;
  
    const move = {
        user,
        name,
        type,
        value,
        date,
        desc
    };
  
    try {
      await Move.create(move);
  
      res.status(201).json({ message: 'Record inserted successfully!' });
    } catch (error) {
      res.status(500).json({ erro: error });
    }
  });

router.patch('/:id', async (req: TypedRequestBody<{ user: string, name: string, type: string, value: number, date: Date, desc: string }>, res: Response) => {
  const id = req.params.id;

  const { user, name, type, value, date, desc } = req.body;
  
    const move = {
        user,
        name,
        type,
        value,
        date,
        desc
    };

  try {
    const updatedMove = await Move.updateOne({ _id: id }, move);

    if (updatedMove.matchedCount === 0) {
      res.status(422).json({ message: 'Record not found!' });
      return
    }

    res.status(200).json(move);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

router.delete('/:id', async (req: TypedRequestBody<{ id: string }>, res: Response) => {
  const id = req.params.id;

  const move = await Move.findOne({ _id: id });

  if (!move) {
    res.status(422).json({ message: 'Record not found!' });
    return
  }

  try {
    await Move.deleteOne({ _id: id });

    res.status(200).json({ message: 'Record deleted successfully!' });
  } catch (error) {
    res.status(500).json({ erro: error });
  }
})

router.get('/:id', async (req: TypedRequestBody<{ id: string }>, res: Response) => {
  const id = req.params.id;

  try {
    const move = await Move.findOne({ _id: id });

    if (!move) {
      res.status(422).json({ message: 'Pedido não encontrado!' });
      return
    }

    res.status(200).json(move);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

router.get('/user/:user', async (req: TypedRequestBody<{ user: string }>, res: Response) => {
  const user = req.params.user;

  try {
    const move = await Move.find({ user: user });

    if (!move) {
      res.status(422).json({ message: 'Record not found!' });
      return
    }

    res.status(200).json(move);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

router.get('/', async (_, res: Response) => {
  try {
      const order = await Move.find();

      res.status(200).json(order);
  } catch (error) {
      res.status(500).json({ erro: error });
  }
});

export default router;
