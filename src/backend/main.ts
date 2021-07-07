import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import * as Sentry from '@sentry/node';

import 'reflect-metadata';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/http-exception.filter';
import { SentryInterceptor } from './common/interceptors/sentry.interceptor';

declare const module: any;

async function bootstrap() {
  Sentry.init({
    dsn: process.env.DSN,
  });
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalInterceptors(new SentryInterceptor());
  // class-validator 적용
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new HttpExceptionFilter());
  const port = process.env.PORT || 8000;

  const config = new DocumentBuilder()
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'authorization', // This name here is important for matching up with @ApiBearerAuth() in your controller!
    )
    .setTitle('Moti API Docs')
    .setDescription('개발을 위한 API 문서입니다.')
    .setVersion('1.0.0')
    .addCookieAuth('connect.id')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'Moti API Docs',
  };
  SwaggerModule.setup('apiDocs', app, document, customOptions);

  await app.listen(port);
  console.log(`listening on port ${port}`);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
