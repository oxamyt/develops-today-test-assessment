export async function fetchRecipes(apiUrl: string) {
  try {
    const response = await fetch(apiUrl, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch recipes");
    }

    const data = await response.json();
    return data.results || [];
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch recipes");
  }
}

export async function fetchRecipeDetails(apiUrl: string) {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch recipe details");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching recipe details:", error);
    throw new Error("Failed to fetch recipe details");
  }
}
