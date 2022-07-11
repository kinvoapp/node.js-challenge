import { Response, Router } from 'express';
import httpStatus from 'http-status';
import { ICustomRequest } from '../../interfaces/ICustomRequest';
import { MovementService } from '../../services/MovementService';
import { controllerPagination } from '../../utils/helper';
import authenticate from '../middlewares/authenticate';
import { validation } from '../middlewares/validation';
import { movementSchema } from '../schemas/movementSchema';
import { getAllFilter } from './filters/movementControllerFilter';

const router = Router();

router.post('/',
  authenticate,
  validation(movementSchema.create),
  async (req: ICustomRequest, res: Response) => {
    let response = null;

    try {
      response = await MovementService.create(req.body);
    } catch ({ statusCode, message }) {
      return res.status(statusCode as number).json({ message });
    }
    
    return res.status(httpStatus.OK).json(response);
  });

router.get('/',
  authenticate,
  async (req: ICustomRequest, res: Response) => {
    let response = null;

    try {
      const searchParameter = {
        where: getAllFilter(req),
        order: controllerPagination(req),
      };

      response = await MovementService.getAll(searchParameter);
    } catch ({ statusCode, message }) {
      return res.status(statusCode as number).json({ message });
    }

    return res.status(httpStatus.OK).json(response);
  });

router.get('/balance',
  authenticate,
  async (req: ICustomRequest, res: Response) => {
    let response = null;

    try {
      response = await MovementService.calculateBalance();
    } catch ({ statusCode, message }) {
      return res.status(statusCode as number).json({ message });
    }

    return res.status(httpStatus.OK).json(response);
  });


router.put('/:id',
  authenticate,
  validation(movementSchema.updateById),
  async (req: ICustomRequest, res: Response) => {
    let response = null;

    try {
      response = await MovementService.updateById(req.params.id, req.body);
    } catch ({ statusCode, message }) {
      return res.status(statusCode as number).json({ message });
    }

    return res.status(httpStatus.OK).json(response);
  });

router.delete('/:id',
  authenticate,
  validation(movementSchema.deleteById),
  async (req: ICustomRequest, res: Response) => {
    let response = null;

    try {
      response = await MovementService.removeById(req.params.id);
    } catch ({ statusCode, message }) {
      return res.status(statusCode as number).json({ message });
    }

    return res.status(httpStatus.OK).json(response);
  });

export default router;