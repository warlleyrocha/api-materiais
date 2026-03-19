<h1 align="center">API Materiais</h1>

<p align="center">
  <img src="https://img.shields.io/static/v1?label=Node.js&message=18%2B&color=339933&style=for-the-badge&logo=nodedotjs"/>
  <img src="https://img.shields.io/static/v1?label=TypeScript&message=5.9&color=3178C6&style=for-the-badge&logo=typescript"/>
  <img src="https://img.shields.io/static/v1?label=Express&message=4&color=000000&style=for-the-badge&logo=express"/>
  <img src="https://img.shields.io/static/v1?label=PostgreSQL&message=pg&color=4169E1&style=for-the-badge&logo=postgresql"/>
  <img src="https://img.shields.io/static/v1?label=Swagger&message=OpenAPI%203.0&color=85EA2D&style=for-the-badge&logo=swagger"/>
  <img src="https://img.shields.io/static/v1?label=Railway&message=Deploy&color=0B0D0E&style=for-the-badge&logo=railway"/>
</p>

### Tópicos

:small_blue_diamond: [Descrição do projeto](#descrição-do-projeto)

:small_blue_diamond: [Funcionalidades](#funcionalidades)

:small_blue_diamond: [Arquitetura](#arquitetura)

:small_blue_diamond: [Endpoints](#endpoints)

:small_blue_diamond: [Pré-requisitos](#pré-requisitos)

:small_blue_diamond: [Como rodar a aplicação](#como-rodar-a-aplicação-arrow_forward)

:small_blue_diamond: [Variáveis de ambiente](#variáveis-de-ambiente)

:small_blue_diamond: [Documentação interativa](#documentação-interativa)

:small_blue_diamond: [Tecnologias utilizadas](#tecnologias-utilizadas-books)

:small_blue_diamond: [Desenvolvedor](#desenvolvedor-octocat)

---

## Descrição do projeto

<p align="justify">
  API REST para consulta de materiais da FFA. Desenvolvida com Node.js, Express e TypeScript, expõe um endpoint paginado para listagem de materiais cadastrados no banco de dados PostgreSQL.
</p>

<p align="justify">
  A API é hospedada no Railway e conta com documentação interativa via Swagger UI, CORS configurado por ambiente, health check e ready check para monitoramento de disponibilidade.
</p>

---

## Funcionalidades

:heavy_check_mark: Listagem paginada de materiais com suporte a `limit` e `page`

:heavy_check_mark: Validação de parâmetros de query com retorno de erro `400` descritivo

:heavy_check_mark: Health check (`/health`) para verificar se a aplicação está viva

:heavy_check_mark: Ready check (`/ready`) com validação de conectividade com o banco

:heavy_check_mark: CORS configurado por ambiente via variável `ALLOWED_ORIGINS`

:heavy_check_mark: Middleware de tratamento de erros centralizado com `AppError`

:heavy_check_mark: Documentação interativa disponível em `/api-docs` (Swagger UI)

---

## Arquitetura

O projeto segue separação por camadas (layered architecture), onde cada responsabilidade vive em seu próprio diretório dentro de `src/`.

```text
src/
├── config/
│   ├── db.ts          # Pool de conexão PostgreSQL
│   ├── env.ts         # Validação e exposição de variáveis de ambiente
│   └── swagger.ts     # Spec OpenAPI 3.0 (schemas + paths)
│
├── routes/
│   └── materiais.ts   # Definição da rota GET /materiais com JSDoc @openapi
│
├── controllers/
│   └── materiaisController.ts   # Validação de query params e orquestração
│
├── services/
│   └── materiaisService.ts      # Regras de negócio e mapeamento para DTO
│
├── models/
│   └── Material.ts              # Acesso ao banco (queries SQL)
│
├── middlewares/
│   └── errorHandler.ts          # Tratamento centralizado de erros
│
├── types/
│   └── material.ts              # Interfaces Material e MaterialDTO
│
└── index.ts                     # Bootstrap da aplicação
```

---

## Endpoints

### Materiais

| Método | Rota         | Descrição                     |
| ------ | ------------ | ----------------------------- |
| `GET`  | `/materiais` | Lista materiais com paginação |

**Query params de `/materiais`:**

| Parâmetro | Tipo    | Obrigatório | Padrão | Máximo | Descrição        |
| --------- | ------- | ----------- | ------ | ------ | ---------------- |
| `limit`   | integer | Não         | `50`   | `100`  | Itens por página |
| `page`    | integer | Não         | `1`    | —      | Número da página |

**Resposta `200`:**

```json
{
  "data": [{ "id": 1, "nomeMaterial": "Cimento CP-II", "codigo": "CIM001" }],
  "total": 200,
  "limit": 50,
  "offset": 0
}
```

**Resposta `400` (parâmetro inválido):**

```json
{ "error": "O parâmetro limit deve ser um número maior que 0" }
```

---

### Infra

| Método | Rota      | Descrição                                                     |
| ------ | --------- | ------------------------------------------------------------- |
| `GET`  | `/health` | Retorna `200` se a aplicação está no ar                       |
| `GET`  | `/ready`  | Retorna `200` se o banco está acessível, `503` caso contrário |

---

## Pré-requisitos

:warning: [Node.js 18+](https://nodejs.org/en/download/)

:warning: PostgreSQL acessível (local ou Railway)

---

## Como rodar a aplicação :arrow_forward:

### 1. Clone o repositório

```bash
git clone https://github.com/warlleyrocha/api-materiais.git
cd api-materiais
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

```bash
cp .env.example .env
# Edite o .env com sua DATABASE_URL e demais variáveis
```

### 4. Execute em modo desenvolvimento

```bash
npm run dev
```

### 5. Build para produção

```bash
npm run build
npm start
```

---

## Scripts disponíveis

| Script          | O que faz                                 |
| --------------- | ----------------------------------------- |
| `npm run dev`   | Inicia com nodemon + ts-node (hot reload) |
| `npm run build` | Compila TypeScript para `dist/`           |
| `npm start`     | Executa o build compilado                 |

---

## Variáveis de ambiente

| Variável          | Obrigatória | Padrão | Descrição                                         |
| ----------------- | ----------- | ------ | ------------------------------------------------- |
| `DATABASE_URL`    | Sim         | —      | String de conexão PostgreSQL                      |
| `PORT`            | Não         | `3000` | Porta em que o servidor sobe                      |
| `ALLOWED_ORIGINS` | Não         | `*`    | Origens permitidas no CORS, separadas por vírgula |

Exemplo de `.env`:

```env
DATABASE_URL=postgresql://usuario:senha@host:porta/database
PORT=3000
ALLOWED_ORIGINS=https://meuapp.com,https://outro.com
```

---

## Documentação interativa

Com a aplicação rodando, acesse:

```
http://localhost:3000/api-docs
```

A documentação é gerada automaticamente via Swagger UI com base na spec OpenAPI 3.0 definida em `src/config/swagger.ts` e nas anotações `@openapi` das rotas.

---

## Tecnologias utilizadas :books:

| Tecnologia                                                              | Uso                                        |
| ----------------------------------------------------------------------- | ------------------------------------------ |
| [Node.js](https://nodejs.org/)                                          | Runtime                                    |
| [TypeScript](https://www.typescriptlang.org/)                           | Tipagem estática                           |
| [Express](https://expressjs.com/)                                       | Framework HTTP                             |
| [node-postgres (pg)](https://node-postgres.com/)                        | Cliente PostgreSQL                         |
| [dotenv](https://github.com/motdotla/dotenv)                            | Carregamento de variáveis de ambiente      |
| [cors](https://github.com/expressjs/cors)                               | Middleware de CORS                         |
| [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc)                | Geração de spec OpenAPI a partir do código |
| [swagger-ui-express](https://github.com/scottie1984/swagger-ui-express) | Interface interativa da documentação       |
| [Railway](https://railway.app/)                                         | Deploy e banco de dados em produção        |

---

## Desenvolvedor:

| [<img src="https://github.com/warlleyrocha.png" width=115><br><sub>Warlley Rocha</sub>](https://github.com/warlleyrocha) |
| :----------------------------------------------------------------------------------------------------------------------: |

---

## Licença

O arquivo de licença será adicionado posteriormente ao repositório.
