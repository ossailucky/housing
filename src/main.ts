import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: { exposedHeaders: ['Content-Length', 'Authorization'] },
  });
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.useGlobalPipes( new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle("Housing")
    .setDescription("Housing v1 Api docs")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/v1", app, document)
  await app.listen(process.env.PORT || 5000, () =>
  console.log('server connected at: ' + process.env.PORT),
);
}
bootstrap();
