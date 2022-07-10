import { Request, Response, Router } from 'express';
import httpStatus from 'http-status';
import { MovementService } from '../../services/MovementService';
import { validation } from '../middlewares/validation';
import { movementSchema } from '../schemas/movementSchema';

const router = Router();

router.post('/',
  validation(movementSchema.create),
  async (req: Request, res: Response) => {
    let response = null;

    try {
      response = await MovementService.create(req.body);
    } catch ({ statusCode, message }) {
      return res.status(statusCode as number).json({ message });
    }
    
    return res.status(httpStatus.OK).json(response);
  });

router.get('/', 
  async (req: Request, res: Response) => {
    let response = null;

    try {
      response = await MovementService.getAll();
    } catch ({ statusCode, message }) {
      return res.status(statusCode as number).json({ message });
    }

    return res.status(httpStatus.OK).json(response);
  });


router.put('/:id',
  validation(movementSchema.updateById),
  async (req: Request, res: Response) => {
    let response = null;

    try {
      response = await MovementService.updateById(req.params.id, req.body);
    } catch ({ statusCode, message }) {
      return res.status(statusCode as number).json({ message });
    }

    return res.status(httpStatus.OK).json(response);
  });

router.delete('/:id',
  validation(movementSchema.deleteById),
  async (req: Request, res: Response) => {
    let response = null;

    try {
      response = await MovementService.removeById(req.params.id);
    } catch ({ statusCode, message }) {
      return res.status(statusCode as number).json({ message });
    }

    return res.status(httpStatus.OK).json(response);
  });

export default router;