import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsDate, IsOptional, IsEnum, Min } from 'class-validator';

export enum IngredientCategory {
  VEGETABLE = '蔬菜',
  FRUIT = '水果',
  MEAT = '肉类',
  SEAFOOD = '海鲜',
  DAIRY = '乳制品',
  GRAIN = '谷物',
  CONDIMENT = '调料',
  OTHER = '其他',
}

export class CreateIngredientDto {
  @ApiProperty({ description: '食材名称' })
  @IsNotEmpty({ message: '食材名称不能为空' })
  @IsString()
  name: string;

  @ApiProperty({ description: '食材分类', enum: IngredientCategory })
  @IsNotEmpty()
  @IsEnum(IngredientCategory)
  category: IngredientCategory;

  @ApiProperty({ description: '数量', minimum: 0 })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  quantity: number;

  @ApiProperty({ description: '单位', example: '克/个/袋' })
  @IsNotEmpty()
  @IsString()
  unit: string;

  @ApiProperty({ description: '购买日期' })
  @IsDate()
  purchaseDate: Date;

  @ApiProperty({ description: '过期日期' })
  @IsDate()
  expiryDate: Date;

  @ApiProperty({ description: '存放位置', example: '冷藏室/冷冻室' })
  @IsOptional()
  @IsString()
  storageLocation?: string;

  @ApiProperty({ description: '备注', required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}

export class UpdateIngredientDto {
  @ApiProperty({ description: '食材名称', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: '食材分类', enum: IngredientCategory, required: false })
  @IsOptional()
  @IsEnum(IngredientCategory)
  category?: IngredientCategory;

  @ApiProperty({ description: '数量', minimum: 0, required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  quantity?: number;

  @ApiProperty({ description: '单位', example: '克/个/袋', required: false })
  @IsOptional()
  @IsString()
  unit?: string;

  @ApiProperty({ description: '购买日期', required: false })
  @IsOptional()
  @IsDate()
  purchaseDate?: Date;

  @ApiProperty({ description: '过期日期', required: false })
  @IsOptional()
  @IsDate()
  expiryDate?: Date;

  @ApiProperty({ description: '存放位置', example: '冷藏室/冷冻室', required: false })
  @IsOptional()
  @IsString()
  storageLocation?: string;

  @ApiProperty({ description: '备注', required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}
