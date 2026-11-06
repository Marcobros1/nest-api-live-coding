import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

process.loadEnvFile();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api'); // todas las rutas empiezan por /api

  // Comprueba los DTO en todas las rutas
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // quita los campos que no estén en el DTO...
      forbidNonWhitelisted: true, // ...o mejor: responde 400 si llegan
      transform: true, // aplica las transformaciones del DTO (como el trim de abajo)
    }),
  );

  app.enableCors({ origin: 'http://localhost:5173' }); // deja pasar al frontend de Vite

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
