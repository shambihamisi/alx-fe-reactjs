import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let alive = true;

    import("../data.json")
      .then((mod) => {
        if (!alive) return;
        const list = mod.default || [];
        const found = list.find((r) => String(r.id) === String(id));
        if (!found) {
          setError("Recipe not found.");
        } else {
          setRecipe(found);
        }
      })
      .catch(() => {
        if (!alive) return;
        setError("Failed to load recipe.");
      })
      .finally(() => {
        if (!alive) return;
        setLoading(false);
      });

    return () => { alive = false; };
  }, [id]);

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8 lg:px-8 py-8 md:py-12">
        <div className="mb-6 md:mb-8 flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            {recipe ? recipe.title : "Recipe Detail"}
          </h1>
          <Link
            to="/"
            className="text-sm md:text-base inline-flex items-center gap-2 px-3 py-2 rounded-lg
                       bg-white shadow-sm ring-1 ring-black/5 hover:shadow-md hover:-translate-y-0.5 transition"
          >
            ← Back to Home
          </Link>
        </div>

        {/* Loading */}
        {loading && (
          <div className="rounded-2xl bg-white ring-1 ring-black/5 p-4 md:p-6 shadow-sm">
            <div className="aspect-[16/9] md:aspect-[21/9] bg-gray-200 rounded-xl animate-pulse" />
            <div className="mt-6 space-y-3">
              <div className="h-5 w-1/3 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="rounded-lg bg-red-50 text-red-700 px-4 py-3 ring-1 ring-red-200">
            {error}
          </div>
        )}

        {/* Content */}
        {!loading && !error && recipe && (
          <article className="bg-white rounded-2xl shadow-sm ring-1 ring-black/5 overflow-hidden">
            {/* Hero image */}
            <div className="aspect-[16/9] md:aspect-[21/9] overflow-hidden">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Body */}
            <div className="p-5 md:p-8">
              {/* Summary */}
              <p className="text-gray-700 md:text-lg">{recipe.summary}</p>

              {/* Grid: Ingredients / Steps */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-5 gap-6">
                {/* Ingredients */}
                <section className="md:col-span-2">
                  <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                    Ingredients
                  </h2>
                  <ul className="mt-3 space-y-2">
                    {(recipe.ingredients || []).map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 rounded-xl bg-gray-50 p-3 ring-1 ring-black/5"
                      >
                        <span className="mt-1 h-2 w-2 rounded-full bg-indigo-600 shrink-0" />
                        <span className="text-gray-800">{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Steps */}
                <section className="md:col-span-3">
                  <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                    Instructions
                  </h2>
                  <ol className="mt-3 space-y-3">
                    {(recipe.steps || []).map((step, idx) => (
                      <li
                        key={idx}
                        className="rounded-xl p-4 ring-1 ring-black/5 bg-white shadow-sm hover:shadow-md transition"
                      >
                        <div className="flex items-start gap-3">
                          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full ring-1 ring-black/5 shadow-sm">
                            {idx + 1}
                          </span>
                          <p className="text-gray-800">{step}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </section>
              </div>
            </div>
          </article>
        )}
      </section>
    </main>
  );
};

export default RecipeDetail;
