import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState(null);

  useEffect(() => {
    let alive = true;

    import("../data.json")
      .then((mod) => {
        if (!alive) return;
        setRecipes(mod.default || []);
      })
      .catch(() => {
        if (!alive) return;
        setError("Failed to load recipes.");
      })
      .finally(() => {
        if (!alive) return;
        setLoading(false);
      });

    return () => { alive = false; };
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-8 py-10 md:py-12">
        <header className="mb-8 md:mb-10">
          <h1 className="text-3xl md:text-4xl sm:text-4xl font-bold tracking-tight text-gray-900">
            Discover New Recipes
          </h1>
          <p className="mt-2 text-gray-600 md:text-base">
            Explore community-shared dishes. Click any card to view full details.
          </p>
        </header>

        {/* Loading state */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded-xl bg-white ring-1 ring-black/5 overflow-hidden shadow animate-pulse"
              >
                <div className="aspect-[16/10] md:aspect-[4/3] bg-gray-200" />
                <div className="p-5 space-y-3">
                  <div className="h-5 w-2/3 bg-gray-200 rounded" />
                  <div className="h-4 w-full bg-gray-200 rounded" />
                  <div className="h-4 w-5/6 bg-gray-200 rounded" />
                  <div className="h-9 w-28 bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error state */}
        {error && !loading && (
          <div className="rounded-lg bg-red-50 text-red-700 px-4 py-3 ring-1 ring-red-200">
            {error}
          </div>
        )}

        {/* Grid of recipe cards with hover & shadow */}
        {!loading && !error && (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {recipes.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-white rounded-2xl shadow-sm ring-1 ring-black/5 overflow-hidden
                           transition hover:shadow-xl hover:-translate-y-1 hover:scale-[1.01] group"
              >
                <div className="aspect-[16/10] md:aspect-[4/3] overflow-hidden">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-5 md:p-6">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                    {recipe.title}
                  </h3>
                  <p className="mt-2 text-sm md:text-base text-gray-600">{recipe.summary}</p>
                  <div className="mt-4">
                    <Link
                      to={`/recipe/${recipe.id}`}
                      className="inline-flex items-center gap-2 text-sm md:text-base font-medium
                                 text-white bg-indigo-600 px-3 md:px-4 py-2 rounded-lg
                                 hover:bg-indigo-700 focus:outline-none focus:ring-2
                                 focus:ring-indigo-500"
                    >
                      View Recipe
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default HomePage;
