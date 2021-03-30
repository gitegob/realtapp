import { INestApplication } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';

const config = new DocumentBuilder()
  .addBearerAuth({ type: 'http', scheme: 'bearer' })
  .setTitle('RealtApp')
  .setDescription('The RealtApp documentation')
  .setVersion('1.0.0')
  .addTag('App', 'App welcome endpoint')
  .addTag('Auth', 'Authentication Endpoints')
  .addTag('Houses', 'House Endpoints')
  .addTag('Bids', 'Bid Endpoints')
  .build();

const customOptions: SwaggerCustomOptions = {
  swaggerOptions: {
    persistAuthorization: true,
  },
  customSiteTitle: 'RealtApp API',
};

export function setupDocs(app: INestApplication): void {
  const document = SwaggerModule.createDocument(app, config);
  return SwaggerModule.setup('api', app, document, customOptions);
}
