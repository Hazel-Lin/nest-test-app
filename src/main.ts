import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function createApp() {
  const app = await NestFactory.create(AppModule, { snapshot: true });

  // 启用全局验证管道
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // 配置 Swagger 文档
  setupSwagger(app);

  return app;
}

function setupSwagger(app) {
  const config = new DocumentBuilder()
    .setTitle('智能冰箱 API')
    .setDescription('智能冰箱管理系统 API 文档')
    .setVersion('1.0')
    .addTag('ingredients', '食材管理')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
}

async function bootstrap() {
  const app = await createApp();
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`应用运行在: ${await app.getUrl()}`);
}

// 本地开发直接启动
if (process.env.NODE_ENV !== 'production') {
  bootstrap();
}

// Vercel 部署时使用
export default async function handler(req, res) {
  const app = await createApp();
  await app.init(); // 确保应用初始化
  app.getHttpAdapter().getInstance()(req, res); // 将请求交给 Nest.js 处理
}
