import { Request, Response, NextFunction } from "express";
import materiaisService from "../services/materiaisService";

const MAX_LIMIT = 100;
const DEFAULT_LIMIT = 50;

const materiaisController = {
  listar: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const rawLimit = Number(req.query.limit);

      if (req.query.limit !== undefined && (Number.isNaN(rawLimit) || rawLimit < 1)) {
        res.status(400).json({ error: "O parâmetro limit deve ser um número maior que 0" });
        return;
      }

      const limit = Math.min(rawLimit || DEFAULT_LIMIT, MAX_LIMIT);
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
