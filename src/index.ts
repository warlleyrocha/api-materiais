import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import materiaisRoutes from './routes/materiais';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);
app.options('*', cors());
app.use(express.json());

// Rota de health check
app.get('/', (req, res) => {
  res.json({ status: 'API online', versao: '1.0.0' });
});

// Rotas
app.use('/materiais', materiaisRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta:  http://localhost:${PORT}`);
});
