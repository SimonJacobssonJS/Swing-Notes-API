// src/swagger.js
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Notes API',
      version: '1.0.0',
      description: 'API för att hantera anteckningar',
    },
    components: {
      schemas: {
        Note: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            title: { type: 'string', maxLength: 50 },
            text: { type: 'string', maxLength: 300 },
            createdAt: { type: 'string', format: 'date-time' },
            modifiedAt: { type: 'string', format: 'date-time' },
          },
          required: ['title', 'text'],
        },
      },
      securitySchemes: {
        bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./src/routes/*.js', './src/controllers/*.js'],
};

const spec = swaggerJSDoc(options);

module.exports = (app) => {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(spec));
};
