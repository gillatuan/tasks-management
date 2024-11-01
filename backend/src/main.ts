import { AppModule } from '@/app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  
  app.use(cookieParser());

  // set prefix
  // app.setGlobalPrefix('api/v1', { exclude: [''] });

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
