import { IngredientCategory } from '../dto/ingredient.dto';

export class Ingredient {
  id: string;
  name: string;
  category: IngredientCategory;
  quantity: number;
  unit: string;
  purchaseDate: Date;
  expiryDate: Date;
  storageLocation?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}
