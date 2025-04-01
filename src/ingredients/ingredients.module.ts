import { Module } from '@nestjs/common';
import { IngredientsController } from './ingredients.controller';
import { IngredientsService } from './ingredients.service';

@Module({
  controllers: [IngredientsController],
  providers: [IngredientsService],
  exports: [IngredientsService], // 确保服务被正确导出
})
export class IngredientsModule {}
