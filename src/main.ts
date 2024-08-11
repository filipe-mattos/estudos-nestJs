import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //Configuracao para utlizar o class validator atravez do validationPipe
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors(
    {origin: }
  ); // Utilizando validacao propia do nestJs para erros de Cross Origin
  await app.listen(3000);
}
bootstrap();
