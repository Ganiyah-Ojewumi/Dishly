import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function RecipeDetails() {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    async function fetchMeal() {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
      );
      const data = await res.json();
      setMeal(data.meals[0]);
    }

    fetchMeal();
  }, [id]);

  if (!meal) return <p className="p-6">Loading...</p>;

  const steps = meal.strInstructions
    .split(/\r?\n/)
    .filter((step) => step.trim() !== "");

  return (
    <div className="min-h-screen bg-white px-4 py-6 md:px-12 pt-20">
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="w-full max-h-100 object-cover rounded-lg"
      />

      <h1 className="text-4xl font-bold mt-6 text-black!">{meal.strMeal}</h1>

      <p className="text-sm text-gray-600 mt-1">
        {meal.strCategory} • {meal.strArea}
      </p>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-2 text-black!">Ingredients</h2>

        <div className="grid sm:grid-cols-2 gap-y-1 text-sm">
          {Array.from({ length: 20 }).map((_, i) => {
            const ingredient = meal[`strIngredient${i + 1}`];
            const measure = meal[`strMeasure${i + 1}`];

            if (ingredient && ingredient.trim() !== "") {
              return (
                <p key={i}>
                  {measure} {ingredient}
                </p>
              );
            }
            return null;
          })}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-2 text-black!">Instructions</h2>

        <div className="space-y-2 text-sm leading-relaxed">
          {steps.map((step, index) => (
            <p key={index}>{step}</p>
          ))}
        </div>
      </div>

      {meal.strYoutube && (
        <a
          href={meal.strYoutube}
          target="_blank"
          className="inline-block mt-6 text-sm text-red-600"
        >
          ▶ Watch tutorial
        </a>
      )}
    </div>
  );
}
