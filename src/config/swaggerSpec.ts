import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Student Profile API',
      version: '1.0.0',
      description:
        'API documentation for the student profile',
    },
  },
  tags: [
    {
      name: 'Student',
      description:
        'Endpoints related to student profile management',
    },
  ],
  apis: ['./src/routes/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
