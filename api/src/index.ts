import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { ExpressApp } from './routers';
import dotenv from 'dotenv';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const StartServer = async () => {
  const app = express();
  const port = 8000;

  dotenv.config();

  app.use(cors({
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
    origin: '*'
  }));

  app.use(bodyParser.json({ limit: "1000mb" }));
  app.use(bodyParser.urlencoded({ extended: false, limit: "1000mb" }));

  // Swagger configuration
  const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'Traycer MVP API',
      version: '1.0.0',
      description: 'API documentation for Traycer MVP',
    },
    servers: [
      {
        url: 'http://localhost:8000/api/v1',
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        PlannerInput: {
          type: 'object',
          required: ['task', 'mode'],
          properties: {
            task: {
              type: 'string',
              description: 'The task description',
            },
            mode: {
              type: 'string',
              enum: ['planner', 'normal'],
              description: 'The mode for generation',
            },
          },
        },
        SuccessResponse: {
          type: 'object',
          properties: {
            statusCode: {
              type: 'integer',
              example: 200,
            },
            success: {
              type: 'boolean',
              example: true,
            },
            data: {
              type: 'object',
              properties: {
                plan: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'Step-by-step plan (only for planner mode)',
                },
                code: {
                  type: 'string',
                  description: 'Generated code snippet',
                },
              },
            },
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            statusCode: {
              type: 'integer',
              example: 400,
            },
            success: {
              type: 'boolean',
              example: false,
            },
            data: {
              type: 'string',
              description: 'Error message',
            },
          },
        },
      },
    },
  };

  const options = {
    swaggerDefinition,
    apis: ['./src/routers/*.ts'], // Path to files with Swagger annotations
  };

  const swaggerSpec = swaggerJSDoc(options);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  await ExpressApp(app);
  app.set('server.timeout', 60000);

  app.listen(port, () => {
    console.log(`listening to port ${port}`);
    console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
  })
  .on('error', (err) => {
    console.log("Errorrrrr===>", err);
    process.exit();
  })
  .on('close', () => {
  });
};

StartServer();