export interface Ingredient {
  name: string;
  quantity: string;
  unit: string;
}

export interface Recipe {
  recipeId?: number;
  recipeName: string;
  servings: number;
  ingredients: Ingredient[];
  preparation: string;
  preparationTime: number;
  category: string;
}

export interface CreateRecipeRequest {
  recipeName: string;
  servings: number;
  ingredients: Ingredient[];
  preparation: string;
  preparationTime: number;
  category: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

export interface Comment {
  id: number;
  author: string;
  content: string;
  rating: number;
  createdAt: string;
}

export interface RecipeWithComments extends Recipe {
  comments: Comment[];
  averageRating: number;
  totalComments: number;
}
