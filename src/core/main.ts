import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.use(morgan('dev'));

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen(4000, '0.0.0.0');
}
bootstrap();
