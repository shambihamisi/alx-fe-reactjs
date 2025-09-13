import { useRecipeStore } from '../store/recipeStore';

export default function RecipeList() {
  const recipes = useRecipeStore((s) => s.recipes);

  if (!recipes.length) return <p>No recipes yet. Add one!</p>;

  return (
    <div className="recipe-list">
      {recipes.map((r) => (
        <article key={r.id} className="recipe-card">
          <h3>{r.title}</h3>
          <p>{r.description}</p>
        </article>
      ))}
    </div>
  );
}
