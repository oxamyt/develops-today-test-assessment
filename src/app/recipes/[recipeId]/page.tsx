import { fetchRecipeDetails } from "@/lib/api";
import Image from "next/image";

export default async function Page({
  params,
}: {
  params: { recipeId: string };
}) {
  const { recipeId } = await params;
  const apiKey = process.env.API_KEY;
  const apiUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;
  const recipe = await fetchRecipeDetails(apiUrl);

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-green-50 to-white min-h-screen text-green-900">
      <h1 className="text-3xl font-bold mb-6 text-green-800">{recipe.title}</h1>

      {recipe.image && (
        <Image
          src={recipe.image}
          alt={recipe.title}
          width={896}
          height={256}
          className="w-full h-64 object-contain rounded-md mb-6 border border-green-200 shadow-md"
        />
      )}

      <div className="mb-6 bg-white/90 backdrop-blur-sm p-6 rounded-lg border border-green-200 shadow-md">
        {recipe.readyInMinutes && (
          <p className="text-lg">
            <span className="font-semibold text-green-800">
              Preparation Time:
            </span>{" "}
            {recipe.readyInMinutes} minutes
          </p>
        )}
        {recipe.servings && (
          <p className="text-lg">
            <span className="font-semibold text-green-800">Servings:</span>{" "}
            {recipe.servings}
          </p>
        )}
      </div>

      <h2 className="text-2xl font-semibold mb-4 text-green-800">
        Ingredients
      </h2>
      <ul className="list-disc pl-6 bg-white/90 backdrop-blur-sm p-6 rounded-lg border border-green-200 shadow-md">
        {recipe.extendedIngredients?.map(
          (ingredient: { original: string }, index: number) => (
            <li key={index} className="text-lg text-green-900">
              {ingredient.original}
            </li>
          )
        )}
      </ul>
    </div>
  );
}
