import { AppModule } from '@/app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { JwtAuthGuard } from "./auth/guards/jwt-auth.guard";
import { TransformInterceptor } from "@/core/transform.interceptor";
import { ConfigService } from "@nestjs/config";
import cookieParser from "cookie-parser";


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector));
  // app.useGlobalInterceptors(new TransformInterceptor(reflector));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  
  app.use(cookieParser());

  //config cors
  app.enableCors(
    {
      "origin": true,
      "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
      "preflightContinue": false,
      credentials: true
    }
  );

  // set prefix
  // app.setGlobalPrefix('api/v1', { exclude: [''] });

  await app.listen(configService.get<string>('PORT'));
}
bootstrap();
