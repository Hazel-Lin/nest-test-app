"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
async function createApp() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('智能冰箱 API')
        .setDescription('智能冰箱管理系统 API 文档')
        .setVersion('1.0')
        .addTag('ingredients', '食材管理')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api-docs', app, document);
    return app;
}
async function bootstrap() {
    const app = await createApp();
    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`应用运行在: ${await app.getUrl()}`);
}
if (process.env.NODE_ENV !== 'production') {
    bootstrap();
}
exports.default = createApp;
//# sourceMappingURL=main.js.map