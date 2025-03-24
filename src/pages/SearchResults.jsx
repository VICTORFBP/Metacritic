import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { searchMovies, getGenres } from "../services/apiService";
import MovieCard from "../components/movie/MovieCard";
import { Spin, Alert } from "antd";

const SearchResults = () => {
  const { query } = useParams();
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        // Obtener la lista de géneros primero
        const genreList = await getGenres();
        const genreMap = genreList.reduce((acc, genre) => {
          acc[genre.id] = genre.name;
          return acc;
        }, {});

        setGenres(genreMap);

        // Luego, obtener las películas de la búsqueda
        const results = await searchMovies(query);
        if (results.length === 0) throw new Error("No se encontraron resultados.");
        setMovies(results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="container mx-auto px-8 py-12">
      <h1 className="text-3xl font-bold text-white mb-6">Resultados para: "{query}"</h1>

      {loading && (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      )}

      {error && <Alert message={error} type="error" showIcon className="mb-4" />}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} genres={genres} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
