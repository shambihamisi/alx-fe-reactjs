import { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState(null);

  useEffect(() => {
    let alive = true;

    // Dynamically import JSON from src so we still “load” it on mount.
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
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
            Discover New Recipes
          </h1>
          <p className="mt-2 text-gray-600">
            Explore community-shared dishes. Click any card to view full details.
          </p>
        </header>

        {/* Loading state */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-2xl bg-white ring-1 ring-black/5 overflow-hidden">
                <div className="aspect-[16/10] bg-gray-200 animate-pulse" />
                <div className="p-5 space-y-3">
                  <div className="h-5 w-2/3 bg-gray-200 animate-pulse rounded" />
                  <div className="h-4 w-full bg-gray-200 animate-pulse rounded" />
                  <div className="h-4 w-5/6 bg-gray-200 animate-pulse rounded" />
                  <div className="h-9 w-28 bg-gray-200 animate-pulse rounded" />
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

        {/* Grid of recipe cards */}
        {!loading && !error && (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
                       gap-6"
          >
            {recipes.map((r) => (
              <RecipeCard key={r.id} recipe={r} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default HomePage;
