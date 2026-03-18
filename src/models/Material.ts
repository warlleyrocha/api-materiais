import pool from '../config/db';
import type { Material } from '../types/material';

export interface PaginationParams {
  limit: number;
  offset: number;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  limit: number;
  offset: number;
}

const MaterialModel = {
  findAll: async ({ limit, offset }: PaginationParams): Promise<PaginatedResult<Material>> => {
    const [{ rows }, { rows: countRows }] = await Promise.all([
      pool.query<Material>(
        'SELECT id, nomematerial, codigo FROM material ORDER BY id ASC LIMIT $1 OFFSET $2',
        [limit, offset],
      ),
      pool.query<{ count: string }>('SELECT COUNT(*) AS count FROM material'),
    ]);
    return { data: rows, total: Number(countRows[0].count), limit, offset };
  },
};

export default MaterialModel;
