import swaggerJSDoc from "swagger-jsdoc";

const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.3",
    info: {
      title: "API de Materiais",
      version: "1.0.0",
      description: "API para listagem paginada de materiais",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Ambiente local",
      },
    ],
    components: {
      schemas: {
        Material: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              example: 1,
            },
            nomeMaterial: {
              type: "string",
              example: "Cimento",
            },
            codigo: {
              type: "string",
              example: "CIM001",
            },
          },
        },
        PaginatedMaterialsResponse: {
          type: "object",
          properties: {
            data: {
              type: "array",
              items: {
                $ref: "#/components/schemas/Material",
              },
            },
            total: {
              type: "integer",
              example: 120,
            },
            limit: {
              type: "integer",
              example: 50,
            },
            offset: {
              type: "integer",
              example: 0,
            },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            erro: {
              type: "string",
              example: "Erro interno do servidor",
            },
          },
        },
        BadRequestResponse: {
          type: "object",
          properties: {
            error: {
              type: "string",
              example: "O parâmetro limit deve ser um número maior que 0",
            },
          },
        },
        HealthResponse: {
          type: "object",
          properties: {
            status: {
              type: "string",
              example: "ok",
            },
            versao: {
              type: "string",
              example: "1.0.0",
            },
          },
        },
        ReadyResponse: {
          type: "object",
          properties: {
            status: {
              type: "string",
              example: "ready",
            },
          },
        },
        UnavailableResponse: {
          type: "object",
          properties: {
            status: {
              type: "string",
              example: "unavailable",
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.ts", "./src/index.ts"],
});

export default swaggerSpec;
