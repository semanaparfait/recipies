import { useState } from 'react';
import { useGetRecipesQuery } from '@/services/recipeApi';
import RecipeCard from '@/components/RecipeCard';
import SearchBar from '@/components/SearchBar';
import Navbar from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import Footer from '@/components/Footer';

export default function Home() {
  const [skip, setSkip] = useState(0);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<string | undefined>();
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const limit = 12;

  const { data, isLoading, error } = useGetRecipesQuery({
    skip,
    limit,
    search,
    sortBy,
    order: sortBy ? order : undefined,
  });

  const handleSearch = (query: string) => {
    setSearch(query);
    setSkip(0);
  };

  const handleSort = (field: string) => {
    setSortBy(field);
    setSkip(0);
  };

  const totalPages = data ? Math.ceil(data.total / limit) : 0;
  const currentPage = Math.floor(skip / limit);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />

      {/* Recipes Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold mb-8 text-center text-gray-900">
          Discover Recipes
        </h2>

        {/* Search and Sort Controls */}
        <div className="mb-8 space-y-4">
          <SearchBar onSearch={handleSearch} />
          <div className="flex gap-4">
            <select
              value={sortBy || ''}
              onChange={(e) => handleSort(e.target.value || '')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Sort by...</option>
              <option value="name">Name</option>
              <option value="rating">Rating</option>
              <option value="prepTimeMinutes">Prep Time</option>
              <option value="cookTimeMinutes">Cook Time</option>
            </select>

            {sortBy && (
              <select
                value={order}
                onChange={(e) => setOrder(e.target.value as 'asc' | 'desc')}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            )}
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            <p className="mt-4 text-gray-600">Loading recipes...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <p className="text-red-700">
              Failed to load recipes. Please try again later.
            </p>
          </div>
        )}

        {/* Recipes Grid */}
        {data && data.recipes.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {data.recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-4">
              <button
                onClick={() => setSkip(Math.max(0, skip - limit))}
                disabled={skip === 0}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg disabled:bg-gray-400 hover:bg-orange-600 transition"
              >
                Previous
              </button>

              <div className="flex items-center gap-2">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum =
                    totalPages <= 5 ? i : Math.max(0, currentPage - 2) + i;
                  if (pageNum >= totalPages) return null;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setSkip(pageNum * limit)}
                      className={`px-3 py-1 rounded-lg ${
                        currentPage === pageNum
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-200 hover:bg-gray-300'
                      }`}
                    >
                      {pageNum + 1}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setSkip(skip + limit)}
                disabled={skip + limit >= data.total}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg disabled:bg-gray-400 hover:bg-orange-600 transition"
              >
                Next
              </button>
            </div>

            <p className="text-center text-gray-600 mt-4">
              Showing {skip + 1} to {Math.min(skip + limit, data.total)} of{' '}
              {data.total} recipes
            </p>
          </>
        ) : !isLoading && data?.recipes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No recipes found</p>
          </div>
        ) : null}
      </section>

      <Footer />
    </div>
  );
}