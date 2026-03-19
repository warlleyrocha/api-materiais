import { Router } from "express";
import materiaisController from "../controllers/materiaisController";

const router = Router();

/**
 * @openapi
 * /materiais:
 *   get:
 *     tags:
 *       - Materiais
 *     summary: Lista materiais com paginação
 *     description: Retorna uma lista paginada de materiais
 *     parameters:
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 50
 *         description: Quantidade máxima de itens por página
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Página atual
 *     responses:
 *       200:
 *         description: Lista paginada de materiais
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedMaterialsResponse'
 *       400:
 *         description: Parâmetro inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BadRequestResponse'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

// GET /materiais - lista todos
router.get("/", materiaisController.listar);

export default router;
