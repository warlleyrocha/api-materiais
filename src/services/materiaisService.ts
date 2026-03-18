import Material, { MaterialRow } from '../models/Material';

const materiaisService = {
  listar: async (): Promise<MaterialRow[]> => {
    return await Material.findAll();
  },
};

export default materiaisService;
