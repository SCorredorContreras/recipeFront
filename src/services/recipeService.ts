import { Recipe, CreateRecipeRequest } from "../types/recipe";

const API_BASE_URL = "https://jpmxhxeaoaroogppqxsa.supabase.co/functions/v1/recipe-api";

export class RecipeService {
  async getAllRecipes(): Promise<Recipe[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/recipes`);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching recipes:", error);
      throw error;
    }
  }

  async createRecipe(recipe: CreateRecipeRequest): Promise<Recipe> {
    try {
      const response = await fetch(`${API_BASE_URL}/recipes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipe),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error creating recipe:", error);
      throw error;
    }
  }

  async updateRecipe(recipe: Recipe): Promise<Recipe> {
    const id = (recipe as any).id ?? (recipe as any).recipeId;
    if (!id) throw new Error("Recipe id is required to update");

    const payload: any = { ...recipe, recipeId: id };
    delete payload.id;

    const res = await fetch(`${API_BASE_URL}/recipes/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error(`Error: ${res.status}`);
    return { ...recipe, id, recipeId: id } as Recipe;
  }

  async deleteRecipe(id: number): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/recipes/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
    } catch (error) {
      console.error("Error deleting recipe:", error);
      throw error;
    }
  }
}
