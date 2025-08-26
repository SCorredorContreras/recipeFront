import React, { useState, useEffect } from "react";
import { X, Plus, Minus } from "lucide-react";
import { Recipe, Ingredient, CreateRecipeRequest } from "../types/recipe";

interface RecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (recipe: CreateRecipeRequest | Recipe) => Promise<void>;
  recipe?: Recipe | null;
  isEditing?: boolean;
}

const defaultIngredient: Ingredient = { name: "", quantity: "", unit: "" };

export const RecipeModal: React.FC<RecipeModalProps> = ({
  isOpen,
  onClose,
  onSave,
  recipe,
  isEditing = false,
}) => {
  const [formData, setFormData] = useState<CreateRecipeRequest>({
    recipeName: "",
    servings: 1,
    ingredients: [defaultIngredient],
    preparation: "",
    preparationTime: 5,
    category: "",
  });
  const [loading, setLoading] = useState(false);

  const categories = [
    "Desayunos",
    "Almuerzos",
    "Cenas",
    "Snacks",
    "Postres",
    "Bebidas",
    "Pickles",
    "Sopas",
    "Ensaladas",
    "Vegetarianas",
  ];

  useEffect(() => {
    if (isEditing && recipe) {
      setFormData({
        recipeName: recipe.recipeName,
        servings: recipe.servings,
        ingredients: [...recipe.ingredients],
        preparation: recipe.preparation,
        preparationTime: recipe.preparationTime,
        category: recipe.category,
      });
    } else {
      setFormData({
        recipeName: "",
        servings: 1,
        ingredients: [defaultIngredient],
        preparation: "",
        preparationTime: 5,
        category: "",
      });
    }
  }, [isEditing, recipe, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEditing && recipe) {
        const id = (recipe as any).id ?? (recipe as any).recipeId;
        if (!id) throw new Error("Falta el id de la receta para actualizar");

        await onSave({ ...(formData as any), recipeId: id } as Recipe);
      } else {
        await onSave(formData);
      }
      onClose();
    } catch (error) {
      console.error("Error saving recipe:", error);
      alert("Error al guardar la receta. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const addIngredient = () => {
    setFormData((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, { ...defaultIngredient }],
    }));
  };

  const removeIngredient = (index: number) => {
    if (formData.ingredients.length > 1) {
      setFormData((prev) => ({
        ...prev,
        ingredients: prev.ingredients.filter((_, i) => i !== index),
      }));
    }
  };

  const updateIngredient = (
    index: number,
    field: keyof Ingredient,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.map((ingredient, i) =>
        i === index ? { ...ingredient, [field]: value } : ingredient
      ),
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">
            {isEditing ? "Editar Receta" : "Nueva Receta"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nombre de la receta *
              </label>
              <input
                type="text"
                value={formData.recipeName}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    recipeName: e.target.value,
                  }))
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Categoría *
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, category: e.target.value }))
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                required
              >
                <option value="">Seleccionar categoría</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Porciones *
              </label>
              <input
                type="number"
                min="1"
                value={formData.servings}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    servings: parseInt(e.target.value),
                  }))
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tiempo de preparación (min) *
              </label>
              <input
                type="number"
                min="1"
                value={formData.preparationTime}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    preparationTime: parseInt(e.target.value),
                  }))
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="block text-sm font-semibold text-gray-700">
                Ingredientes *
              </label>
              <button
                type="button"
                onClick={addIngredient}
                className="flex items-center gap-2 px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                <Plus size={16} />
                Agregar
              </button>
            </div>

            <div className="space-y-3 max-h-60 overflow-y-auto">
              {formData.ingredients.map((ingredient, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <input
                    type="text"
                    placeholder="Nombre del ingrediente"
                    value={ingredient.name}
                    onChange={(e) =>
                      updateIngredient(index, "name", e.target.value)
                    }
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Cantidad"
                    value={ingredient.quantity}
                    onChange={(e) =>
                      updateIngredient(index, "quantity", e.target.value)
                    }
                    className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Unidad"
                    value={ingredient.unit}
                    onChange={(e) =>
                      updateIngredient(index, "unit", e.target.value)
                    }
                    className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => removeIngredient(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    disabled={formData.ingredients.length === 1}
                  >
                    <Minus size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Preparación *
            </label>
            <textarea
              rows={6}
              value={formData.preparation}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  preparation: e.target.value,
                }))
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none"
              placeholder="Describe paso a paso cómo preparar la receta..."
              required
            />
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading
                ? "Guardando..."
                : isEditing
                ? "Actualizar"
                : "Crear Receta"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
