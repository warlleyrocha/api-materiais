import MaterialModel from '../models/Material';
import type { Material } from '../types/material';

const materiaisService = {
  listar: async (): Promise<Material[]> => {
    return await MaterialModel.findAll();
  },
};

export default materiaisService;
