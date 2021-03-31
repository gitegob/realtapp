import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { urlencoded, json } from 'express';
import { WinstonModule } from 'nest-winston';
import { AppModule } from './app.module';
import loggerConfig from './shared/config/logger.config';
import { setupDocs } from './shared/config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(loggerConfig),
  });
  /**
   * Add global prefix '<host>/api/'
   */
  app.setGlobalPrefix('api');

  /**
   * Use global validation pipe
   */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  /**
   * Set up bodyParser and data limit
   */
  app.use(json({ limit: '10mb' }));
  app.use(
    urlencoded({ limit: '10mb', extended: true, parameterLimit: 1000000 }),
  );
  app.enableCors();
  /**
   * Set up docs
   */
  setupDocs(app);
  /**
   * Start the app
   * @param port
   * @param callback
   */
  const config = app.get(ConfigService);

  await app.listen(config.get('global.port'), async () =>
    console.log(`Server running on ${config.get('global.port')}`),
  );
}
bootstrap();
