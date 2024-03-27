import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import * as cookieParser from "cookie-parser";

import { AppConfig } from "~config/AppConfig";

import { AppModule } from "./AppModule";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix(AppConfig.globalPrefix);
  app.use(cookieParser());
  await app.listen(8080);
}

bootstrap();
