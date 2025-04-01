import { Injectable, NotFoundException } from '@nestjs/common';
import { Ingredient } from './entities/ingredient.entity';
import { CreateIngredientDto, UpdateIngredientDto } from './dto/ingredient.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class IngredientsService {
  // 模拟数据库
  private ingredients: Ingredient[] = [];

  findAll(): Ingredient[] {
    return this.ingredients;
  }

  findOne(id: string): Ingredient {
    const ingredient = this.ingredients.find(item => item.id === id);
    if (!ingredient) {
      throw new NotFoundException(`ID为${id}的食材不存在`);
    }
    return ingredient;
  }

  create(createIngredientDto: CreateIngredientDto): Ingredient {
    const newIngredient: Ingredient = {
      id: uuidv4(),
      ...createIngredientDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.ingredients.push(newIngredient);
    return newIngredient;
  }

  update(id: string, updateIngredientDto: UpdateIngredientDto): Ingredient {
    const ingredientIndex = this.ingredients.findIndex(item => item.id === id);
    if (ingredientIndex === -1) {
      throw new NotFoundException(`ID为${id}的食材不存在`);
    }

    const updatedIngredient = {
      ...this.ingredients[ingredientIndex],
      ...updateIngredientDto,
      updatedAt: new Date(),
    };

    this.ingredients[ingredientIndex] = updatedIngredient;
    return updatedIngredient;
  }

  remove(id: string): void {
    const index = this.ingredients.findIndex(item => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`ID为${id}的食材不存在`);
    }
    this.ingredients.splice(index, 1);
  }
}
