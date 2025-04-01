import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle("智能冰箱 API")
    .setDescription("智能冰箱应用 API 文档")
    .setVersion("1.0")
    .addTag("food", "食材管理")
    .addTag("recipe", "菜谱管理")
    .addTag("user", "用户管理")
    .addTag("ai", "AI 服务")
    .addTag("food-recognition", "食材识别")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, document);

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
