const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /materiais - lista todos
router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM material ORDER BY id ASC'
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao buscar materiais' });
  }
});

module.exports = router;
