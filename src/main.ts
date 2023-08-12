import { NestFactory } from '@nestjs/core';
import { ValidationPipe} from "@nestjs/common"
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(new ValidationPipe())

  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.use(cookieParser());

  await app.listen(3000);
}
bootstrap();
