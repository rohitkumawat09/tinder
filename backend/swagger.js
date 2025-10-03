import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Tinder Clone API',
      version: '1.0.0',
      description: 'API documentation for Tinder-like application',
    },
    servers: [
    { url: process.env.BACKEND_URL || process.env.LOCAL_URL }
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'token'
        }
      }
    },
    security: [{ cookieAuth: [] }]
  },
  apis: ['./routes/*.js', './models/*.js'], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;