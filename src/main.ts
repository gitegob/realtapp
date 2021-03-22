import { PassportModule } from '@nestjs/passport';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { config, customOptions } from './config/swagger.config';
import env from './env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
   * Set up docs
   */
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, customOptions);

  /**
   * Start the app
   * @param port
   * @param callback
   */
  await app.listen(env.PORT, () =>
    console.log(`Server running on ${env.PORT}`),
  );
}
bootstrap();