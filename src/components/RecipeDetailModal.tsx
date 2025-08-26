import React, { useState } from 'react';
import { X, Clock, Users, ChefHat, Star, MessageCircle, Send } from 'lucide-react';
import { Recipe, Comment } from '../types/recipe';

interface RecipeDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipe: Recipe;
}

export const RecipeDetailModal: React.FC<RecipeDetailModalProps> = ({ 
  isOpen, 
  onClose, 
  recipe 
}) => {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: "María González",
      content: "¡Excelente receta! Muy fácil de seguir y el resultado fue delicioso. Perfecta para estudiantes como yo.",
      rating: 5,
      createdAt: "2024-01-15T10:30:00Z"
    },
    {
      id: 2,
      author: "Carlos Rodríguez",
      content: "La preparé el fin de semana y quedó increíble. Los ingredientes son fáciles de conseguir y económicos.",
      rating: 4,
      createdAt: "2024-01-14T15:45:00Z"
    }
  ]);
  
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [authorName, setAuthorName] = useState('');

  const averageRating = comments.length > 0 
    ? comments.reduce((sum, comment) => sum + comment.rating, 0) / comments.length 
    : 0;

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() && authorName.trim()) {
      const comment: Comment = {
        id: Date.now(),
        author: authorName.trim(),
        content: newComment.trim(),
        rating: newRating,
        createdAt: new Date().toISOString()
      };
      
      setComments(prev => [comment, ...prev]);
      setNewComment('');
      setAuthorName('');
      setNewRating(5);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderStars = (rating: number, interactive = false, onRatingChange?: (rating: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={20}
            className={`${
              star <= rating 
                ? 'text-yellow-400 fill-yellow-400' 
                : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
            onClick={() => interactive && onRatingChange && onRatingChange(star)}
          />
        ))}
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Detalles de la Receta</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          {/* Header de la receta */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{recipe.recipeName}</h1>
                <span className="inline-block px-4 py-2 text-sm bg-green-100 text-green-800 rounded-full font-medium">
                  {recipe.category}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                {renderStars(averageRating)}
                <span className="text-gray-600 ml-2">
                  {averageRating.toFixed(1)} ({comments.length} reseñas)
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-6 text-gray-600">
              <div className="flex items-center gap-2">
                <Clock size={20} className="text-orange-500" />
                <span>{recipe.preparationTime} minutos</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={20} className="text-orange-500" />
                <span>{recipe.servings} porciones</span>
              </div>
              <div className="flex items-center gap-2">
                <ChefHat size={20} className="text-orange-500" />
                <span>{recipe.ingredients.length} ingredientes</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Ingredientes */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Ingredientes</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <ul className="space-y-3">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                      <span className="font-medium text-gray-800">{ingredient.name}</span>
                      <span className="text-gray-600">{ingredient.quantity} {ingredient.unit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Preparación */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Preparación</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {recipe.preparation}
                </p>
              </div>
            </div>
          </div>

          {/* Sección de comentarios */}
          <div className="mt-8 border-t pt-8">
            <div className="flex items-center gap-2 mb-6">
              <MessageCircle size={24} className="text-orange-500" />
              <h3 className="text-xl font-bold text-gray-800">
                Comentarios y Reseñas ({comments.length})
              </h3>
            </div>

            {/* Formulario para nuevo comentario */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h4 className="font-semibold text-gray-800 mb-4">Deja tu reseña</h4>
              <form onSubmit={handleSubmitComment} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tu nombre
                    </label>
                    <input
                      type="text"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Ingresa tu nombre"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Calificación
                    </label>
                    <div className="flex items-center gap-2">
                      {renderStars(newRating, true, setNewRating)}
                      <span className="text-sm text-gray-600 ml-2">({newRating}/5)</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tu comentario
                  </label>
                  <textarea
                    rows={4}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none"
                    placeholder="Comparte tu experiencia con esta receta..."
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  <Send size={16} />
                  Publicar Reseña
                </button>
              </form>
            </div>

            {/* Lista de comentarios */}
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h5 className="font-semibold text-gray-800">{comment.author}</h5>
                      <div className="flex items-center gap-2 mt-1">
                        {renderStars(comment.rating)}
                        <span className="text-sm text-gray-500">
                          {formatDate(comment.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{comment.content}</p>
                </div>
              ))}
            </div>

            {comments.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <MessageCircle size={48} className="mx-auto mb-4 text-gray-300" />
                <p>Aún no hay comentarios. ¡Sé el primero en dejar una reseña!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};