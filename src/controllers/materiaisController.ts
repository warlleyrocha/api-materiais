import { Request, Response } from 'express';
import materiaisService from '../services/materiaisService';

const materiaisController = {
  listar: async (req: Request, res: Response): Promise<void> => {
    try {
      const materiais = await materiaisService.listar();
      res.json(materiais);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: 'Erro ao buscar materiais' });
    }
  },
};

export default materiaisController;
