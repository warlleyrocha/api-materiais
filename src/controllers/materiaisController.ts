import { Request, Response, NextFunction } from 'express';
import materiaisService from '../services/materiaisService';

const MAX_LIMIT = 100;
const DEFAULT_LIMIT = 20;

const materiaisController = {
  listar: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const limit = Math.min(Math.max(Number(req.query.limit) || DEFAULT_LIMIT, 1), MAX_LIMIT);
      const page = Math.max(Number(req.query.page) || 1, 1);
      const offset = (page - 1) * limit;
      const result = await materiaisService.listar({ limit, offset });
      res.json(result);
    } catch (error) {
      next(error);
    }
  },
};

export default materiaisController;
