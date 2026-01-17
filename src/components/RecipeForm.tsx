import { useState, useEffect } from 'react';

interface RecipeFormProps {
  recipe?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export default function RecipeForm({ recipe, onSubmit, onCancel }: RecipeFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    ingredients: [''],
    instructions: [''],
    prepTimeMinutes: 10,
    cookTimeMinutes: 20,
    servings: 4,
    difficulty: 'Easy',
    cuisine: 'Italian',
    caloriesPerServing: 300,
    tags: [],
    mealType: [],
    image: '',
  });

  useEffect(() => {
    if (recipe) {
      setFormData({
        name: recipe.name,
        ingredients: recipe.ingredients || [''],
        instructions: recipe.instructions || [''],
        prepTimeMinutes: recipe.prepTimeMinutes || 10,
        cookTimeMinutes: recipe.cookTimeMinutes || 20,
        servings: recipe.servings || 4,
        difficulty: recipe.difficulty || 'Easy',
        cuisine: recipe.cuisine || 'Italian',
        caloriesPerServing: recipe.caloriesPerServing || 300,
        tags: recipe.tags || [],
        mealType: recipe.mealType || [],
        image: recipe.image || '',
      });
    }
  }, [recipe]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: isNaN(Number(value)) ? value : Number(value),
    }));
  };

  const handleArrayChange = (index: number, field: 'ingredients' | 'instructions', value: string) => {
    const updatedArray = [...formData[field]];
    updatedArray[index] = value;
    setFormData((prev) => ({
      ...prev,
      [field]: updatedArray,
    }));
  };

  const addArrayItem = (field: 'ingredients' | 'instructions') => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ''],
    }));
  };

  const removeArrayItem = (index: number, field: 'ingredients' | 'instructions') => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      ingredients: formData.ingredients.filter(i => i.trim()),
      instructions: formData.instructions.filter(i => i.trim()),
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">
        {recipe ? 'Edit Recipe' : 'Create New Recipe'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Recipe Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Recipe name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Cuisine
            </label>
            <input
              type="text"
              name="cuisine"
              value={formData.cuisine}
              onChange={handleChange}
              placeholder="e.g., Italian, Mexican"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Difficulty
            </label>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Servings
            </label>
            <input
              type="number"
              name="servings"
              value={formData.servings}
              onChange={handleChange}
              min="1"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Prep Time (minutes)
            </label>
            <input
              type="number"
              name="prepTimeMinutes"
              value={formData.prepTimeMinutes}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Cook Time (minutes)
            </label>
            <input
              type="number"
              name="cookTimeMinutes"
              value={formData.cookTimeMinutes}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Calories Per Serving
            </label>
            <input
              type="number"
              name="caloriesPerServing"
              value={formData.caloriesPerServing}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Image URL
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        {/* Ingredients */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Ingredients</h3>
          <div className="space-y-2">
            {formData.ingredients.map((ingredient, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={ingredient}
                  onChange={(e) => handleArrayChange(index, 'ingredients', e.target.value)}
                  placeholder="Enter ingredient"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                {formData.ingredients.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem(index, 'ingredients')}
                    className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => addArrayItem('ingredients')}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            + Add Ingredient
          </button>
        </div>

        {/* Instructions */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Instructions</h3>
          <div className="space-y-2">
            {formData.instructions.map((instruction, index) => (
              <div key={index} className="flex gap-2">
                <textarea
                  value={instruction}
                  onChange={(e) => handleArrayChange(index, 'instructions', e.target.value)}
                  placeholder="Enter instruction step"
                  rows={2}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                {formData.instructions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem(index, 'instructions')}
                    className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => addArrayItem('instructions')}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            + Add Step
          </button>
        </div>

        {/* Form Actions */}
        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition font-semibold"
          >
            {recipe ? 'Update Recipe' : 'Create Recipe'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition font-semibold"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
