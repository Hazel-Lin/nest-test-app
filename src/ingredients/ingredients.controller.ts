import { Controller, Get, Post, Body, Put, Param, Delete, HttpStatus } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { CreateIngredientDto, UpdateIngredientDto } from './dto/ingredient.dto';
import { Ingredient } from './entities/ingredient.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('ingredients')
@Controller('ingredients')
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Post()
  @ApiOperation({ summary: '创建食材' })
  @ApiResponse({ status: HttpStatus.CREATED, description: '食材创建成功', type: Ingredient })
  create(@Body() createIngredientDto: CreateIngredientDto): Ingredient {
    return this.ingredientsService.create(createIngredientDto);
  }

  @Get()
  @ApiOperation({ summary: '获取所有食材' })
  @ApiResponse({ status: HttpStatus.OK, description: '返回所有食材列表', type: [Ingredient] })
  findAll(): Ingredient[] {
    return this.ingredientsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '根据ID获取食材' })
  @ApiParam({ name: 'id', description: '食材ID' })
  @ApiResponse({ status: HttpStatus.OK, description: '返回指定食材', type: Ingredient })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: '食材不存在' })
  findOne(@Param('id') id: string): Ingredient {
    return this.ingredientsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: '更新食材' })
  @ApiParam({ name: 'id', description: '食材ID' })
  @ApiResponse({ status: HttpStatus.OK, description: '食材更新成功', type: Ingredient })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: '食材不存在' })
  update(
    @Param('id') id: string,
    @Body() updateIngredientDto: UpdateIngredientDto,
  ): Ingredient {
    return this.ingredientsService.update(id, updateIngredientDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除食材' })
  @ApiParam({ name: 'id', description: '食材ID' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: '食材删除成功' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: '食材不存在' })
  remove(@Param('id') id: string): void {
    this.ingredientsService.remove(id);
  }
}
