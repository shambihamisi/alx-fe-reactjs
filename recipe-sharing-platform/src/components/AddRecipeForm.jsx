import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const fieldBase =
  "block w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500";
const labelBase = "block text-sm font-medium text-gray-800 mb-2";
const errorText = "mt-2 text-sm text-red-600";

export default function AddRecipeForm({ onAdd }) {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [ingredientsText, setIngredientsText] = useState("");
  const [stepsText, setStepsText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [touched, setTouched] = useState({ title: false, ingredients: false, steps: false });

  // Helpers to split textarea input into arrays (by new line or comma)
  const ingredients = useMemo(
    () =>
      ingredientsText
        .split(/\r?\n|,/)
        .map((s) => s.trim())
        .filter(Boolean),
    [ingredientsText]
  );

  const steps = useMemo(
    () =>
      stepsText
        .split(/\r?\n/)
        .map((s) => s.trim())
        .filter(Boolean),
    [stepsText]
  );

  // Simple validations
  const errors = {
    title: title.trim().length === 0 ? "Please enter a recipe title." : "",
    ingredients:
      ingredients.length < 2 ? "List at least two ingredients (one per line or separated by commas)." : "",
    steps: steps.length < 1 ? "Add at least one instruction step (one per line)." : "",
  };

  const isValid = !errors.title && !errors.ingredients && !errors.steps;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ title: true, ingredients: true, steps: true });
    if (!isValid) return;

    try {
      setSubmitting(true);

      // Create a recipe object; generate a temporary id
      const newRecipe = {
        id: Date.now(),
        title: title.trim(),
        summary: steps[0]?.slice(0, 120) || "New recipe",
        image: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=1200&auto=format&fit=crop", // placeholder
        ingredients,
        steps,
      };

      // Prefer a parent-provided handler (e.g., Zustand or context)
      if (typeof onAdd === "function") {
        onAdd(newRecipe);
      } else {
        // Fallback: persist to localStorage so the app can read it later
        const existing = JSON.parse(localStorage.getItem("recipes") || "[]");
        localStorage.setItem("recipes", JSON.stringify([newRecipe, ...existing]));
      }

      // Reset & navigate to detail page
      setTitle("");
      setIngredientsText("");
      setStepsText("");
      navigate(`/recipe/${newRecipe.id}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="mx-auto max-w-3xl px-4 sm:px-6 md:px-8 py-10">
        <header className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Add a New Recipe</h1>
          <p className="mt-2 text-gray-600">
            Share your culinary masterpiece with the community. Fields marked * are required.
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-sm ring-1 ring-black/5 p-5 md:p-8"
          noValidate
        >
          {/* Title */}
          <div className="mb-6">
            <label htmlFor="title" className={labelBase}>
              Title *
            </label>
            <input
              id="title"
              type="text"
              className={`${fieldBase} ${touched.title && errors.title ? "border-red-500 ring-red-500" : ""}`}
              placeholder="e.g., Nyama Choma with Kachumbari"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, title: true }))}
              aria-invalid={!!(touched.title && errors.title)}
              aria-describedby="title-error"
            />
            {touched.title && errors.title && <p id="title-error" className={errorText}>{errors.title}</p>}
          </div>

          {/* Layout: Ingredients & Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Ingredients */}
            <div>
              <label htmlFor="ingredients" className={labelBase}>
                Ingredients * (one per line or separated by commas)
              </label>
              <textarea
                id="ingredients"
                className={`${fieldBase} min-h-[160px] ${
                  touched.ingredients && errors.ingredients ? "border-red-500 ring-red-500" : ""
                }`}
                placeholder={"2 chicken breasts\n1 onion\n2 tomatoes\n1 tsp salt\n..."}
                value={ingredientsText}
                onChange={(e) => setIngredientsText(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, ingredients: true }))}
                aria-invalid={!!(touched.ingredients && errors.ingredients)}
                aria-describedby="ingredients-error"
              />
              {touched.ingredients && errors.ingredients && (
                <p id="ingredients-error" className={errorText}>{errors.ingredients}</p>
              )}
            </div>

            {/* Steps */}
            <div>
              <label htmlFor="steps" className={labelBase}>
                Preparation Steps * (one per line)
              </label>
              <textarea
                id="steps"
                className={`${fieldBase} min-h-[160px] ${
                  touched.steps && errors.steps ? "border-red-500 ring-red-500" : ""
                }`}
                placeholder={"Marinate chicken in spices\nSauté onions till soft\nAdd tomatoes and simmer\n..."}
                value={stepsText}
                onChange={(e) => setStepsText(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, steps: true }))}
                aria-invalid={!!(touched.steps && errors.steps)}
                aria-describedby="steps-error"
              />
              {touched.steps && errors.steps && <p id="steps-error" className={errorText}>{errors.steps}</p>}
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex justify-center items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white
                         hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500
                         disabled:opacity-60 disabled:cursor-not-allowed shadow-sm hover:shadow-md transition"
            >
              {submitting ? "Submitting..." : "Submit Recipe"}
            </button>
            <button
              type="button"
              onClick={() => {
                setTitle("");
                setIngredientsText("");
                setStepsText("");
                setTouched({ title: false, ingredients: false, steps: false });
              }}
              className="inline-flex justify-center items-center rounded-xl bg-white px-5 py-3 font-semibold text-gray-800
                         ring-1 ring-black/5 hover:shadow-md hover:-translate-y-0.5 transition"
            >
              Reset
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
