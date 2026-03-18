const express = require('express');
const router = express.Router();
const materiaisController = require('../controllers/materiaisController');

// GET /materiais - lista todos
router.get('/', materiaisController.listar);

module.exports = router;
