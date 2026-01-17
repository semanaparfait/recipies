export function Hero() {
  return (
    <section className="bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 text-white py-20">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Discover Your Next Favorite Recipe
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90">
          Explore thousands of delicious recipes from around the world
        </p>
        <div className="flex gap-4 justify-center">
          <button className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
            Explore Recipes
          </button>
          <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:bg-opacity-10 transition">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}
