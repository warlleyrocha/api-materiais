import MaterialModel, { PaginatedResult, PaginationParams } from '../models/Material';
import type { MaterialDTO } from '../types/material';
import { toDTO } from '../types/material';

const materiaisService = {
  listar: async (params: PaginationParams): Promise<PaginatedResult<MaterialDTO>> => {
    const result = await MaterialModel.findAll(params);
    return { ...result, data: result.data.map(toDTO) };
  },
};

export default materiaisService;
