const pool = require("../config/db");

const Material = {
  findAll: async () => {
    const { rows } = await pool.query("SELECT * FROM material ORDER BY id ASC");
    return rows;
  },
};

module.exports = Material;
