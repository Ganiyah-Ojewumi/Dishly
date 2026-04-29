import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [meals, setMeals] = useState([]);
  const [category, setCategory] = useState("All");

  async function getData(query = "") {
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`,
      );
      const data = await res.json();
      setMeals(data.meals || []);
    } catch (error) {
      console.log("Something went wrong");
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const filteredMeals =
    category === "All"
      ? meals
      : meals.filter((meal) => meal.strCategory === category);

  return (
    <div className="min-h-screen bg-[#f7f4f4] w-full pt-20">
      <header className="text-center mt-4 mb-3 px-4">
        <h1 className="text-2xl font-semibold text-gray-800">
          Discover Recipes
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Cook something amazing today
        </p>
      </header>

      <div className="flex justify-center gap-2 mb-4 px-4">
        <input
          type="text"
          placeholder="Search meals..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && getData(search)}
          className="px-3 py-2 w-full max-w-sm border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-black"
        />

        <button
          onClick={() => getData(search)}
          className="px-3 py-2 bg-black text-white text-sm rounded-md hover:bg-gray-800 transition"
        >
          Search
        </button>
      </div>

      <div className="flex justify-center gap-2 flex-wrap mb-6 px-4">
        {["All", "Beef", "Chicken", "Dessert", "Seafood", "Vegetarian"].map(
          (cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1 text-xs rounded-full border ${
                category === cat
                  ? "bg-black text-white"
                  : "bg-white text-gray-600"
              }`}
            >
              {cat}
            </button>
          ),
        )}
      </div>

      <main className="grid gap-5 px-4 sm:px-6 md:px-8 lg:px-10 pb-10 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {filteredMeals.map((meal) => (
          <article
            key={meal.idMeal}
            onClick={() => navigate(`/recipe/${meal.idMeal}`)}
            className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer group"
          >
            <div className="relative">
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="h-36 w-full object-cover group-hover:scale-105 transition duration-300"
              />

              <span className="absolute top-2 left-2 bg-white/90 text-[10px] px-2 py-0.5 rounded-full">
                {meal.strCategory}
              </span>
            </div>

            <div className="p-3">
              <h3 className="text-xs font-medium leading-snug line-clamp-2">
                {meal.strMeal}
              </h3>

              <div className="flex justify-between items-center mt-2 text-[11px] text-gray-500">
                <span>{meal.strArea}</span>
                <span className="text-red-500 font-medium">View</span>
              </div>
            </div>
          </article>
        ))}
      </main>
    </div>
  );
}
