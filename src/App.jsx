

import React, { useEffect, useState } from "react";
import Search from "./components/Search";
import { Loader } from "./components/Loader";
import MovieCard from "./components/MovieCard";

const API_BASE_URL = "https://imdb8.p.rapidapi.com";
const API_KEY = import.meta.env.VITE_RAPIDAPI_KEY; // Ensure you have this in your .env file

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [imdbResults, setImdbResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchImdbMovies = async (query) => {
    const url = `${API_BASE_URL}/auto-complete?q=${encodeURIComponent(query)}`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": API_KEY,
        "x-rapidapi-host": "imdb8.p.rapidapi.com",
      },
    };

    try {
      setIsLoading(true);
      const response = await fetch(url, options);
      if (!response.ok) throw new Error("Failed to fetch IMDb movies");

      const result = await response.json();
      setImdbResults(result.d || []); // Assuming 'd' contains the list of movies
    } catch (error) {
      console.error(`Error fetching IMDb movies: ${error}`);
      setErrorMessage("Error fetching IMDb movies. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch movies when searchTerm changes
  useEffect(() => {
    if (searchTerm) {
      fetchImdbMovies(searchTerm);
    } else {
      setImdbResults([]); // Clear results if no search term
    }
  }, [searchTerm]);

  return (
    <main>
      <div className="pattern">
        <div className="wrapper">
          <header>
            <img src="./hero.png" alt="Hero banner" />
            <h1>
              Find <span className="text-gradient">Movies</span> You'll Enjoy
              Without the Hassle{" "}
            </h1>

            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </header>

          <section className="all-movies">
            <h2 className="mt-[40px]">Search Results</h2>

            {isLoading ? (
              <Loader />
            ) : errorMessage ? (
              <p className="text-red-500">{errorMessage}</p>
            ) : (
              <ul>
                {imdbResults.map((movie) => (
                  <MovieCard key={movie.id} movie={movie}/>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default App;
