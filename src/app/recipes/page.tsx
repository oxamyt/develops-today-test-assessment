interface Recipe {
  id: number;
  title: string;
  image?: string;
}

import { fetchRecipes } from "@/lib/api";
import RecipesList from "./RecipesList";

export default async function Page({
  searchParams,
}: {
  searchParams: { query?: string; cuisine?: string; maxPrepTime?: string };
}) {
  const { query, cuisine, maxPrepTime } = await searchParams;

  const params = new URLSearchParams();
  if (query) params.set("query", query);
  if (cuisine) params.set("cuisine", cuisine);
  if (maxPrepTime) params.set("maxPrepTime", maxPrepTime);
  const apiKey = process.env.API_KEY;
  params.set("apiKey", String(apiKey));

  const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?${params.toString()}`;

  let recipes: Recipe[] = [];
  let error: string | null = null;

  try {
    recipes = await fetchRecipes(apiUrl);
  } catch (err: unknown) {
    if (err instanceof Error) {
      error = `Failed to fetch recipes: ${err.message}`;
    } else {
      error = "An unknown error occurred while fetching recipes.";
    }
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white p-4">
        <div className="max-w-4xl w-full bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-8 text-center border border-green-200">
          <h1 className="text-4xl font-bold text-red-500 mb-4">
            Oops, Something Went Wrong
          </h1>
          <p className="text-green-800 text-lg">
            Failed to load recipes: {error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-green-800 mb-8 text-center">
          Your Recipes
        </h1>

        <RecipesList recipes={recipes} />
      </div>
    </div>
  );
}
