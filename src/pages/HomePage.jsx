import { useEffect, useState } from "react";
import MovieCard from "../components/movie/MovieCard";
import { Spin, Alert } from "antd";
import { getPopularMovies, getGenres } from "../services/apiService";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const genreList = await getGenres();
        const genreMap = genreList.reduce((acc, genre) => {
          acc[genre.id] = genre.name;
          return acc;
        }, {});

        setGenres(genreMap);

        const data = await getPopularMovies();
        if (data.length === 0) throw new Error("No se encontraron películas.");
        setMovies(data);
      } catch (err) {
        setError(err.message || "Error al cargar las películas.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mx-auto max-w-screen-2xl px-6 py-8">
      <h1 className="text-3xl font-bold text-black mb-6 text-center">
        🎬 Películas Destacadas
      </h1>

      {loading && (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      )}

      {error && (
        <div className="mb-4">
          <Alert message={error} type="error" showIcon />
        </div>
      )}

      {!loading && !error && (
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} genres={genres} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
