interface Recipe {
  id: number;
  title: string;
  image?: string;
}

import { fetchRecipes } from "@/lib/api";
import Link from "next/link";

export default async function Page({
  searchParams,
}: {
  searchParams: { query?: string; cuisine?: string; maxPrepTime?: string };
}) {
  const { query, cuisine, maxPrepTime } = searchParams;

  const params = new URLSearchParams();
  if (query) params.set("query", query);
  if (cuisine) params.set("cuisine", cuisine);
  if (maxPrepTime) params.set("maxPrepTime", maxPrepTime);
  const apiKey = process.env.API_KEY;
  params.set("apiKey", String(apiKey));

  const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?${params.toString()}`;

  const recipes: Recipe[] = await fetchRecipes(apiUrl);

  const error = null;

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <Link
              key={recipe.id}
              href={`/recipes/${recipe.id}`}
              className="block group relative bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden border border-green-200 shadow-md"
            >
              <img
                src={recipe.image || "/placeholder-image.jpg"}
                alt={recipe.title}
                className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-5">
                <h2 className="text-xl font-semibold text-green-900 text-center">
                  {recipe.title}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
