import { useState, useEffect, useMemo } from "react";
import { ChefHat, AlertCircle, RefreshCw } from "lucide-react";
import { Recipe, CreateRecipeRequest } from "./types/recipe";
import { RecipeService } from "./services/recipeService";
import { RecipeCard } from "./components/RecipeCard";
import { RecipeModal } from "./components/RecipeModal";
import { SearchAndFilter } from "./components/SearchAndFilter";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { RecipeDetailModal } from "./components/RecipeDetailModal";
import { LandingPage } from "./components/LandingPage";

const recipeService = new RecipeService();

function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [showLanding, setShowLanding] = useState(true);

  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Categorías únicas de las recetas
  const categories = useMemo(() => {
    const cats = Array.from(
      new Set(recipes.map((recipe) => recipe.category))
    ).filter(Boolean);
    return cats.sort();
  }, [recipes]);

  const goToLanding = () => {
    setShowLanding(true);
    setIsModalOpen(false);
    setIsDetailModalOpen(false);
    setEditingRecipe(null);
    setSelectedRecipe(null);
    setSearchTerm("");
    setSelectedCategory("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Recetas filtradas
  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      const matchesSearch =
        recipe.recipeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.ingredients.some((ingredient) =>
          ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesCategory =
        !selectedCategory || recipe.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [recipes, searchTerm, selectedCategory]);

  const loadRecipes = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedRecipes = await recipeService.getAllRecipes();
      setRecipes(fetchedRecipes);
    } catch (err) {
      const errorMessage = (err as Error).message;
      if (errorMessage === "Failed to fetch") {
        setError(
          "No se puede conectar al servidor. Asegúrate de que el backend esté ejecutándose en http://localhost:3000"
        );
      } else {
        setError("Error cargando recetas: " + errorMessage);
      }
      console.error("Error loading recipes:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleGetStarted = () => {
    setShowLanding(false);
    if (recipes.length === 0 && !error) {
      loadRecipes();
    }
  };

  // Si estamos mostrando la landing page, no cargar recetas automáticamente
  useEffect(() => {
    if (!showLanding) {
      loadRecipes();
    } else {
      setLoading(false);
    }
  }, [showLanding]);

  // Mostrar landing page
  if (showLanding) {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  const handleCreateRecipe = async (recipeData: CreateRecipeRequest) => {
    try {
      const newRecipe = await recipeService.createRecipe(recipeData);
      setRecipes((prev) => [...prev, newRecipe]);
    } catch (error) {
      throw error;
    }
  };

  const normalizeId = (r: any) => r.id ?? r.recipeId;

  const handleUpdateRecipe = async (recipeData: Recipe) => {
    const updated = await recipeService.updateRecipe(recipeData);
    setRecipes((prev) =>
      prev.map((r) =>
        normalizeId(r) === normalizeId(updated) ? { ...r, ...updated } : r
      )
    );
  };

  const handleDeleteRecipe = async (id: number) => {
    try {
      await recipeService.deleteRecipe(id);
      setRecipes((prev) => prev.filter((recipe) => recipe.recipeId !== id));
    } catch (error) {
      alert("Error al eliminar la receta. Inténtalo de nuevo.");
    }
  };

  const openEditModal = (recipe: Recipe) => {
    setEditingRecipe(recipe);
    setIsModalOpen(true);
  };

  const openCreateModal = () => {
    setEditingRecipe(null);
    setIsModalOpen(true);
  };

  const openDetailModal = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setIsDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedRecipe(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingRecipe(null);
  };

  const handleSaveRecipe = async (recipeData: CreateRecipeRequest | Recipe) => {
    if (editingRecipe) {
      await handleUpdateRecipe(recipeData as Recipe);
    } else {
      await handleCreateRecipe(recipeData as CreateRecipeRequest);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="large" />
          <p className="mt-4 text-gray-600">Cargando recetas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* ÍCONO clickeable */}
              <button
                type="button"
                onClick={goToLanding}
                className="p-3 bg-orange-500 rounded-xl hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
                aria-label="Volver a inicio"
                title="Inicio"
              >
                <ChefHat size={32} className="text-white" />
              </button>

              {/* Título NO clickeable */}
              <div>
                <h1 className="text-3xl font-bold text-gray-900">RecetasU</h1>
                <p className="text-gray-600">
                  Recetas fáciles para estudiantes foráneos
                </p>
              </div>
            </div>

            {error && (
              <button
                onClick={loadRecipes}
                className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                <RefreshCw size={20} />
                Reintentar
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error ? (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-red-800 mb-2">
              Error de conexión
            </h3>
            <p className="text-red-600 mb-4">{error}</p>
            <p className="text-sm text-red-500">
              Asegúrate de que tu servidor NestJS esté ejecutándose en
              http://localhost:3000
            </p>
          </div>
        ) : (
          <>
            <SearchAndFilter
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              categories={categories}
              onCreateNew={openCreateModal}
            />

            {filteredRecipes.length === 0 ? (
              <div className="text-center py-12">
                <ChefHat size={64} className="text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  {searchTerm || selectedCategory
                    ? "No se encontraron recetas"
                    : "No hay recetas disponibles"}
                </h3>
                <p className="text-gray-500 mb-6">
                  {searchTerm || selectedCategory
                    ? "Intenta con otros términos de búsqueda o filtros"
                    : "Comienza creando tu primera receta"}
                </p>
                {!searchTerm && !selectedCategory && (
                  <button
                    onClick={openCreateModal}
                    className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    Crear Primera Receta
                  </button>
                )}
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {searchTerm || selectedCategory
                      ? "Resultados de búsqueda"
                      : "Todas las Recetas"}
                    <span className="ml-2 text-sm font-normal text-gray-500">
                      ({filteredRecipes.length}{" "}
                      {filteredRecipes.length === 1 ? "receta" : "recetas"})
                    </span>
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredRecipes.map((recipe) => (
                    <RecipeCard
                      key={recipe.recipeId}
                      recipe={recipe}
                      onEdit={openEditModal}
                      onDelete={handleDeleteRecipe}
                      onViewDetails={openDetailModal}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </main>

      <RecipeModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSaveRecipe}
        recipe={editingRecipe}
        isEditing={!!editingRecipe}
      />

      {selectedRecipe && (
        <RecipeDetailModal
          isOpen={isDetailModalOpen}
          onClose={closeDetailModal}
          recipe={selectedRecipe}
        />
      )}
    </div>
  );
}

export default App;
