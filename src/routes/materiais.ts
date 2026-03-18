import { Router } from 'express';
import materiaisController from '../controllers/materiaisController';

const router = Router();

// GET /materiais - lista todos
router.get('/', materiaisController.listar);

export default router;
