import { useEffect, useState } from "react";
import MediaCard from "../components/movie/MediaCard";
import { Spin, Alert } from "antd";
import { getPopularMedia } from "../services/apiService";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const data = await getPopularMedia("movie");
        if (data.length === 0) throw new Error("No se encontraron películas.");
        setMovies(data);
      } catch (err) {
        setError(err.message || "Error al cargar las películas.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="mx-auto max-w-screen-2xl px-6 py-8">
      <h1 className="text-3xl font-bold text-black mb-6 text-center">
        🎬 Películas Populares
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <MediaCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MoviesPage;
