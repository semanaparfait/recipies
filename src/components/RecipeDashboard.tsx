import type { Recipe } from '@/services/recipeApi';

interface RecipeDashboardProps {
  recipes: Recipe[];
  onEdit: (recipe: Recipe) => void;
  onDelete: (id: number) => void;
}

export default function RecipeDashboard({
  recipes,
  onEdit,
  onDelete,
}: RecipeDashboardProps) {
  if (recipes.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <p className="text-gray-600 text-lg">No recipes yet. Create your first recipe!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {recipes.map((recipe) => (
        <div
          key={recipe.id}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
        >
          <div className="flex gap-4">
            {recipe.image && (
              <img
                src={recipe.image}
                alt={recipe.name}
                className="w-24 h-24 object-cover rounded-lg"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100';
                }}
              />
            )}
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {recipe.name}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3 text-sm text-gray-600">
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
              <p className="text-sm text-gray-600 mb-3">
                {recipe.instructions?.[0]?.substring(0, 100)}...
              </p>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => onEdit(recipe)}
              className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition font-semibold"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(recipe.id)}
              className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition font-semibold"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
