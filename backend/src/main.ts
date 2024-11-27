import { AppModule } from '@/app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "./modules/users/users.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const jwtService = app.get(JwtService);
  const usersService = app.get(UsersService);

  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector, jwtService, usersService));
  // app.useGlobalInterceptors(new TransformInterceptor(reflector));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.use(cookieParser());

  //config cors
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    credentials: true,
  });

  // set prefix
  // app.setGlobalPrefix('api/v1', { exclude: [''] });

  await app.listen(configService.get<string>('PORT'));
}
bootstrap();
