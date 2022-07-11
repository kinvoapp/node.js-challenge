import { Request, Response, Router } from 'express';
import httpStatus from 'http-status';
import { AuthService } from '../../services/AuthService';
import { validation } from '../middlewares/validation';
import { authSchema } from '../schemas/authSchema';

const router = Router();

router.post('/register',
  validation(authSchema.register),
  async (req: Request, res: Response) => {
    let response = null;

    try {
      response = await AuthService.register(req.body);
    } catch({ statusCode, message }) {
      return res.status(statusCode as number).json({ message });
    }

    return res.status(httpStatus.OK).json(response);
  });

router.post('/login',
  validation(authSchema.login),
  async (req: Request, res: Response) => {
    let response = null;

    try {
      response = await AuthService.login(req.body);
    } catch({ statusCode, message }) {
      return res.status(statusCode as number).json({ message });
    }

    return res.status(httpStatus.OK).json(response);
  });

export default router;