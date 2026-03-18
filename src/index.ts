import { env } from './config/env'; // valida variáveis de ambiente antes de qualquer coisa
import express from 'express';
import cors from 'cors';
import materiaisRoutes from './routes/materiais';
import { errorHandler } from './middlewares/errorHandler';
import pool from './config/db';

const app = express();

const origins = env.ALLOWED_ORIGINS;
app.use(
  cors({
    origin: origins.length === 1 && origins[0] === '*' ? '*' : origins,
    methods: ['GET', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
  }),
);
app.options('*', cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', versao: '1.0.0' });
});

app.get('/ready', async (_req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ready' });
  } catch {
    res.status(503).json({ status: 'unavailable' });
  }
});

app.use('/materiais', materiaisRoutes);

app.use(errorHandler);

app.listen(env.PORT, () => {
  console.log(`Servidor rodando na porta: http://localhost:${env.PORT}`);
});
