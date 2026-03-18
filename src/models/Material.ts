import pool from '../config/db';
import type { Material } from '../types/material';

const MaterialModel = {
  findAll: async (): Promise<Material[]> => {
    const { rows } = await pool.query<Material>('SELECT * FROM material ORDER BY id ASC');
    return rows;
  },
};

export default MaterialModel;
