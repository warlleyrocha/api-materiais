import { env } from "./config/env"; // valida variáveis de ambiente antes de qualquer coisa
import express from "express";
import cors from "cors";
import path from "node:path";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";
import materiaisRoutes from "./routes/materiais";
import { errorHandler } from "./middlewares/errorHandler";
import pool from "./config/db";

const app = express();
app.disable("x-powered-by");

const origins = env.ALLOWED_ORIGINS;
app.use(
  cors({
    origin: origins.length === 1 && origins[0] === "*" ? "*" : origins,
    methods: ["GET", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  }),
);
app.options("*", cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "views", "home.html"));
});

/**
 * @openapi
 * /health:
 *   get:
 *     tags:
 *       - Infra
 *     summary: Verifica se a aplicação está viva
 *     responses:
 *       200:
 *         description: Aplicação operacional
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HealthResponse'
 */
app.get("/health", (_req, res) => {
  res.json({ status: "ok", versao: "1.0.0" });
});

/**
 * @openapi
 * /ready:
 *   get:
 *     tags:
 *       - Infra
 *     summary: Verifica se a aplicação está pronta e com acesso ao banco
 *     responses:
 *       200:
 *         description: Aplicação pronta
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReadyResponse'
 *       503:
 *         description: Dependência indisponível
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnavailableResponse'
 */
app.get("/ready", async (_req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ status: "ready" });
  } catch {
    res.status(503).json({ status: "unavailable" });
  }
});

app.use("/materiais", materiaisRoutes);

app.use((_req, res) => {
  res.status(404).json({ erro: "Rota não encontrada" });
});

app.use(errorHandler);

app.listen(env.PORT, () => {
  const g = "\x1b[32m";
  const d = "\x1b[2;32m";
  const r = "\x1b[0m";

  console.log(`${g}
 █████╗ ██████╗ ██╗    ███╗   ███╗ █████╗ ████████╗
██╔══██╗██╔══██╗██║    ████╗ ████║██╔══██╗╚══██╔══╝
███████║██████╔╝██║    ██╔████╔██║███████║   ██║
██╔══██║██╔═══╝ ██║    ██║╚██╔╝██║██╔══██║   ██║
██║  ██║██║     ██║    ██║ ╚═╝ ██║██║  ██║   ██║
╚═╝  ╚═╝╚═╝     ╚═╝    ╚═╝     ╚═╝╚═╝  ╚═╝   ╚═╝${r}`);
  console.log(`${d}─────────────────────────────────────────────────${r}`);
  console.log(`${d}// DESCRIÇÃO${r}`);
  console.log(`${g}   API construída para realizar listagem de materiais.${r}`);
  console.log(`${d}─────────────────────────────────────────────────${r}`);
  console.log(`${d}→ app    ${r}${g}http://localhost:${env.PORT}${r}`);
  console.log(`${d}→ docs   ${r}${g}http://localhost:${env.PORT}/api-docs${r}`);
  console.log(`${d}─────────────────────────────────────────────────${r}\n`);
});
