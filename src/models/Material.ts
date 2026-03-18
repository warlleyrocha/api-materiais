import pool from '../config/db';

export interface MaterialRow {
  id: number;
  [key: string]: unknown;
}

const Material = {
  findAll: async (): Promise<MaterialRow[]> => {
    const { rows } = await pool.query<MaterialRow>('SELECT * FROM material ORDER BY id ASC');
    return rows;
  },
};

export default Material;
