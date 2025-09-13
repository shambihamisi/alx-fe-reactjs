import { useState } from 'react'
import { useEffect } from 'react';
import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';
import { useRecipeStore } from './store/recipeStore';
import './index.css';

export default function App() {
  const recipes = useRecipeStore((s) => s.recipes);
  const setRecipes = useRecipeStore((s) => s.setRecipes);

  // Optional: seed initial data once (only if empty)
  useEffect(() => {
    if (recipes.length === 0) {
      setRecipes([
        { id: 1, title: 'Kuku Paka', description: 'Coconut chicken curry (Coastal Kenya).' },
        { id: 2, title: 'Mukimo', description: 'Mashed potatoes with greens & maize.' },
      ]);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <main className="container">
      <h1>Recipe Sharing App</h1>
      <AddRecipeForm />
      <RecipeList />
    </main>
  );
}
