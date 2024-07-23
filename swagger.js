const swaggerJSDoc = require('swagger-jsdoc');
const swaggerDefinition = require('./swagger.json');

const options = {
  definition: swaggerDefinition,
  apis: ['./screenRoutes.js', './screenController.js'], // Adjust if necessary
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
