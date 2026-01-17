import { Link } from 'react-router-dom';
import type { Recipe } from '@/services/recipeApi';

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      <div className="relative pb-2/3 bg-gray-200 h-48 overflow-hidden">
        <img
          src={recipe.image || 'https://via.placeholder.com/300x200'}
          alt={recipe.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x200';
          }}
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2 text-gray-800">
          {recipe.name}
        </h3>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-yellow-400">⭐</span>
          <span className="text-sm font-medium text-gray-700">
            {recipe.rating?.toFixed(1) || 'N/A'} ({recipe.reviewCount || 0} reviews)
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-3 text-sm text-gray-600">
          <div>
            <span className="font-semibold">Prep:</span> {recipe.prepTimeMinutes}m
          </div>
          <div>
            <span className="font-semibold">Cook:</span> {recipe.cookTimeMinutes}m
          </div>
          <div>
            <span className="font-semibold">Serves:</span> {recipe.servings}
          </div>
          <div>
            <span className="font-semibold">Level:</span> {recipe.difficulty}
          </div>
        </div>

        <div className="mb-3">
          <span className="inline-block bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-semibold">
            {recipe.cuisine}
          </span>
        </div>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {recipe.instructions?.[0] || 'Delicious recipe'}
        </p>

        <Link
          to={`/recipe/${recipe.id}`}
          className="block w-full text-center bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition font-semibold"
        >
          View Recipe
        </Link>
      </div>
    </div>
  );
}
