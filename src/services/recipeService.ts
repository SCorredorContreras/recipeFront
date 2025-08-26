import { Recipe, CreateRecipeRequest } from "../types/recipe";

const API_BASE_URL =
  "https://jpmxhxeaoaroogppqxsa.supabase.co/functions/v1/recipe-api";

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
  // En tu archivo RecipeService.ts

  // en RecipeService.ts

  async createRecipe(recipe: CreateRecipeRequest): Promise<Recipe> {
    try {
      const payload = {
        nombre_receta: recipe.recipeName,
        porciones_receta: recipe.servings,
        ingredientes_receta: recipe.ingredients,
        preparacion_receta: recipe.preparation,
        tiempo_preparacion: recipe.preparationTime,
        categoria_receta: recipe.category,
      };

      const response = await fetch(`${API_BASE_URL}/recipes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorBody = await response.json();
        console.error("Error creating recipe:", errorBody.error);
        throw new Error(`Error: ${response.status}`);
      }

      // La respuesta del backend es un arreglo, por lo que necesitas el primer elemento
      const data = await response.json();

      const createdRecipe = {
        recipeId: data[0].cod_receta,
        recipeName: data[0].nombre_receta,
        servings: data[0].porciones_receta,
        ingredients: data[0].ingredientes_receta,
        preparation: data[0].preparacion_receta,
        preparationTime: data[0].tiempo_preparacion,
        category: data[0].categoria_receta,
      };

      return createdRecipe;
    } catch (error) {
      console.error("Error saving recipe:", error);
      throw error;
    }
  }

  async updateRecipe(recipe: Recipe): Promise<Recipe> {
    const id = (recipe as any).id ?? (recipe as any).recipeId;
    if (!id) throw new Error("Recipe id is required to update");

    const payload = {
      nombre_receta: recipe.recipeName,
      porciones_receta: recipe.servings,
      ingredientes_receta: recipe.ingredients,
      preparacion_receta: recipe.preparation,
      tiempo_preparacion: recipe.preparationTime,
      categoria_receta: recipe.category,
    };

    try {
      const res = await fetch(`${API_BASE_URL}/recipes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorBody = await res.json();
        console.error("Error updating recipe:", errorBody.error);
        throw new Error(`Error: ${res.status}`);
      }
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch:", error);
      throw error;
    }
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
