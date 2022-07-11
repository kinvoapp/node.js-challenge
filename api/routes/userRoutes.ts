import express, { Request, Response } from 'express';
import User from '../models/User';

const router = express.Router();

interface TypedRequestBody<T> extends Request {
    body: T;
};

router.post('/', async (req: TypedRequestBody<{ name: string, password: string, email: string }>, res: Response) => {
    const { name, password, email } = req.body;
  
    const user = {
        name,
        password,
        email
    };
  
    try {
      await User.create(user);
  
      res.status(201).json({ message: 'Record inserted successfully!' });
    } catch (error) {
      res.status(500).json({ erro: error });
    }
});

router.patch('/:id', async (req: TypedRequestBody<{ name: string, password: string, email: string }>, res: Response) => {
  const id = req.params.id;

  const { name, password, email } = req.body;

  const user = {
      name,
      password,
      email
  };

  try {
    const updatedUser = await User.updateOne({ _id: id }, user);

    if (updatedUser.matchedCount === 0) {
      res.status(422).json({ message: 'User not found!' });
      return
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});
  
router.get('/', async (_, res: Response) => {
    try {
        const order = await User.find();

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ erro: error });
    }
});

router.get('/:id', async (req: TypedRequestBody<{ id: string }>, res: Response) => {
  const id = req.params.id;

  try {
    const user = await User.findOne({ _id: id });

    if (!user) {
      res.status(422).json({ message: 'User not found!' });
      return
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

router.delete('/:id', async (req: TypedRequestBody<{ id: string }>, res: Response) => {
  const id = req.params.id;

  const user = await User.findOne({ _id: id });

  if (!user) {
    res.status(422).json({ message: 'User not found!' });
    return
  }

  try {
    await User.deleteOne({ _id: id });

    res.status(200).json({ message: 'Record deleted successfully!' });
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

router.post('/login', async (req: TypedRequestBody<{ name: string, password: string }>, res: Response) => {
    const { name, password } = req.body;

    try {
        const getUser = await User.find({ name: name, password: password });

        if (!getUser) {
        res.status(422).json({ message: 'User not found!' });
        return
        }

        res.status(200).json(getUser);
    } catch (error) {
        res.status(500).json({ erro: error });
    }
});

router.post('/getUser', async (req: TypedRequestBody<{ name: string }>, res: Response) => {
  try {
      const getUser = await User.findOne({ name: req.body.name });

      if (!getUser) {
        res.status(422).json({ message: 'User not found!' });
        return
      }

      res.status(200).json(getUser);
  } catch (error) {
      res.status(500).json({ erro: error });
  }
});

export default router;
