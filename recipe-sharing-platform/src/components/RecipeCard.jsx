import { Link } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  return (
    <article
      className="group bg-white rounded-2xl shadow-sm ring-1 ring-black/5 overflow-hidden transition
                 hover:shadow-xl hover:-translate-y-0.5 hover:scale-[1.01]"
    >
      <div className="aspect-[16/10] overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900">{recipe.title}</h3>
        <p className="mt-2 text-sm text-gray-600">
          {recipe.summary}
        </p>

        {/* Link to detail page (wire this when you add routes) */}
        <div className="mt-4">
          <Link
            to={`/recipe/${recipe.id}`}
            className="inline-flex items-center gap-2 text-sm font-medium
                       text-white bg-indigo-600 px-3 py-2 rounded-lg
                       hover:bg-indigo-700 focus:outline-none focus-visible:ring-2
                       focus-visible:ring-indigo-500"
          >
            View Recipe
            <svg
              aria-hidden="true"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M12.293 5.293a1 1 0 011.414 0l4 4a.999.999 0 010 1.414l-4 4a1 1 0 11-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"/>
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default RecipeCard;
