import React from "react";
import { Clock, Users, Edit, Trash2, ChefHat } from "lucide-react";
import { Recipe } from "../types/recipe";

interface RecipeCardProps {
  recipe: Recipe;
  onEdit: (recipe: Recipe) => void;
  onDelete: (id: number) => void;
  onViewDetails: (recipe: Recipe) => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  onEdit,
  onDelete,
  onViewDetails,
}) => {
  const handleDelete = () => {
    if (
      window.confirm(
        `¿Estás seguro de que quieres eliminar la receta "${recipe.recipeName}"?`
      )
    ) {
      if (recipe.recipeId) onDelete(recipe.recipeId);
    }
  };

  const handleEditClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onEdit(recipe);
  };

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    handleDelete();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden cursor-pointer">
      <div className="bg-gradient-to-r from-orange-400 to-orange-500 h-2"></div>

      <div className="p-6" onClick={() => onViewDetails(recipe)}>
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
              {recipe.recipeName}
            </h3>
            <span className="inline-block px-3 py-1 text-sm bg-green-100 text-green-800 rounded-full">
              {recipe.category}
            </span>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleEditClick}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
              title="Editar receta"
            >
              <Edit size={18} />
            </button>
            <button
              type="button"
              onClick={handleDeleteClick}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
              title="Eliminar receta"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Clock size={16} />
            <span>{recipe.preparationTime} min</span>
          </div>
          <div className="flex items-center gap-1">
            <Users size={16} />
            <span>{recipe.servings} porciones</span>
          </div>
          <div className="flex items-center gap-1">
            <ChefHat size={16} />
            <span>{recipe.ingredients.length} ingredientes</span>
          </div>
        </div>

        <div className="mb-4">
          <h4 className="font-semibold text-gray-700 mb-2">
            Ingredientes principales:
          </h4>
          <div className="flex flex-wrap gap-2">
            {recipe.ingredients.slice(0, 3).map((ingredient) => (
              <span
                key={
                  ingredient.name
                } /* usa name si es único; si no, añade un índice */
                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md"
              >
                {ingredient.name}
              </span>
            ))}
            {recipe.ingredients.length > 3 && (
              <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md">
                +{recipe.ingredients.length - 3} más
              </span>
            )}
          </div>
        </div>

        <p className="text-gray-600 text-sm line-clamp-3">
          {recipe.preparation}
        </p>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(recipe);
            }}
            className="w-full px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium"
          >
            Ver Detalles Completos
          </button>
        </div>
      </div>
    </div>
  );
};
