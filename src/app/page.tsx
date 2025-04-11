"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const [query, setInputValue] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [preptime, setPreptime] = useState("");

  const router = useRouter();

  const cuisines = [
    { value: "Italian", label: "Italian" },
    { value: "Chinese", label: "Chinese" },
    { value: "Mexican", label: "Mexican" },
  ];

  const isNextDisabled = !query && !cuisine && !preptime;

  const handleNextClick = () => {
    const queryString = new URLSearchParams({
      query,
      cuisine,
      preptime,
    }).toString();

    router.push(`/recipe?${queryString}`);
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-gray-900 rounded-lg">
      <input
        type="text"
        value={query}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter query"
        className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-md "
      />
      <select
        name="cuisine"
        value={cuisine}
        onChange={(e) => setCuisine(e.target.value)}
        className="w-full p-3 mt-4 bg-gray-800 text-white border border-gray-700 rounded-md "
      >
        {cuisines.map((cuisine) => (
          <option key={cuisine.value} value={cuisine.value}>
            {cuisine.label}
          </option>
        ))}
      </select>
      <input
        type="number"
        value={preptime}
        onChange={(e) => setPreptime(e.target.value)}
        placeholder="Enter a number"
        className="w-full p-3 mt-4 bg-gray-800 text-white border border-gray-700 rounded-md"
      />
      <button
        onClick={handleNextClick}
        disabled={isNextDisabled}
        className={`w-full p-3 mt-4 text-white rounded-md ${
          isNextDisabled
            ? "bg-gray-600 cursor-not-allowed"
            : "bg-green-500 hover:bg-green-600"
        }`}
      >
        Next
      </button>
    </div>
  );
}
