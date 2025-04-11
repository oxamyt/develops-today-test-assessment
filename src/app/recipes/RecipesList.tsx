"use client";

import Link from "next/link";
import { Suspense } from "react";

interface Recipe {
  id: number;
  title: string;
  image?: string;
}

interface RecipesListProps {
  recipes: Recipe[];
}

export default function RecipesList({ recipes }: RecipesListProps) {
  return (
    <Suspense
      fallback={
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-white/90 rounded-xl border border-green-200 shadow-md animate-pulse"
            >
              <div className="w-full h-56 bg-gray-200" />
              <div className="p-5">
                <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto" />
              </div>
            </div>
          ))}
        </div>
      }
    >
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
    </Suspense>
  );
}
