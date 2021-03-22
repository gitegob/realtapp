import { DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';

export const config = new DocumentBuilder()
  .addBearerAuth({ type: 'http', scheme: 'bearer' })
  .setTitle('RealtApp')
  .setDescription('The RealtApp documentation')
  .setVersion('1.0.0')
  .addTag('App', 'App welcome endpoint')
  .addTag('Auth', 'Authentication Endpoints')
  .addTag('Houses', 'House Endpoints')
  .addTag('Bids', 'Bid Endpoints')
  .build();

export const customOptions: SwaggerCustomOptions = {
  swaggerOptions: {
    persistAuthorization: true,
  },
  customSiteTitle: 'RealtApp API',
};
