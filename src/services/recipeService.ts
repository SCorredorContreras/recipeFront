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
        body: JSON.stringify(payload), // Envía el objeto con los nombres corregidos
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

  // Mapea los nombres de las propiedades a los nombres de las columnas de la base de datos
  const payload = {
    "nombre_receta": recipe.recipeName,
    "porciones_receta": recipe.servings,
    "ingredientes_receta": recipe.ingredients,
    "preparacion_receta": recipe.preparation,
    "tiempo_preparacion": recipe.preparationTime,
    "categoria_receta": recipe.category,
  };

  const res = await fetch(`${API_BASE_URL}/recipes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload), // Envía el nuevo objeto "payload"
  });

  if (!res.ok) {
    const errorBody = await res.json();
    console.error("Error updating recipe:", errorBody.error);
    throw new Error(`Error: ${res.status}`);
  }

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
