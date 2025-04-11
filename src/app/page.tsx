"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const [query, setInputValue] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [maxPrepTime, setMaxPrepTime] = useState("");

  const router = useRouter();

  const cuisines = [
    { value: "", label: "Select Cuisine" },
    { value: "Italian", label: "Italian" },
    { value: "Chinese", label: "Chinese" },
    { value: "Mexican", label: "Mexican" },
  ];

  const isNextDisabled = !query && !cuisine && !maxPrepTime;

  const handleNextClick = () => {
    const queryString = new URLSearchParams({
      query,
      cuisine,
      maxPrepTime,
    }).toString();

    router.push(`/recipes?${queryString}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white p-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-green-200">
        <div className="mb-5">
          <label className="block text-sm font-medium text-green-800 mb-2">
            Search Query
          </label>
          <input
            type="text"
            value={query}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="e.g., pasta, tacos..."
            className="w-full p-3 bg-green-50 text-green-900 border outline-none border-green-300 rounded-lg  focus:border-green-400"
          />
        </div>

        <div className="mb-5">
          <label className="block text-sm font-medium text-green-800 mb-2">
            Cuisine
          </label>
          <select
            name="cuisine"
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            className="w-full p-3 bg-green-50 text-green-900 border border-green-300 rounded-lg  focus:border-green-400"
          >
            {cuisines.map((cuisine) => (
              <option
                key={cuisine.value}
                value={cuisine.value}
                className="bg-white"
              >
                {cuisine.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-8">
          <label className="block text-sm font-medium text-green-800 mb-2">
            Max Prep Time (minutes)
          </label>
          <input
            type="number"
            value={maxPrepTime}
            onChange={(e) => setMaxPrepTime(e.target.value)}
            placeholder="e.g., 30"
            className="w-full p-3 bg-green-50 text-green-900 border outline-none border-green-300 rounded-lg  focus:border-green-400"
            min="1"
          />
        </div>

        <button
          onClick={handleNextClick}
          disabled={isNextDisabled}
          className={`w-full p-3 rounded-lg font-semibold text-white transition-all duration-300 ${
            isNextDisabled
              ? "bg-green-300 cursor-not-allowed opacity-50"
              : "bg-green-600 hover:bg-green-700 active:scale-95 shadow-lg cursor-pointer"
          }`}
        >
          Find Recipes
        </button>
      </div>
    </div>
  );
}
