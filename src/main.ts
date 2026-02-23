import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove campos que não estão no DTO
      forbidNonWhitelisted: true, // Erro se enviarem campos extras
      transform: true, // Converte tipos automaticamente
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('API de Alunos')
    .setDescription('CRUD simples de alunos para exemplo')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // O Swagger ficará em /api

  await app.listen(3000);
}
bootstrap().catch((err) => {
  console.error('Erro ao iniciar a aplicação:', err);
  process.exit(1); // Fecha o processo com erro caso o Nest não suba
});
