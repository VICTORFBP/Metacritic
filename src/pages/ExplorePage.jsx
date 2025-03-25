import { useEffect, useState } from "react";
import { getPopularMedia, getGenres } from "../services/apiService";
import MediaCard from "../components/movie/MediaCard";
import { Spin, Alert } from "antd";

const ExplorePage = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const genreList = await getGenres("movie"); // Especificar tipo "movie"
        const genreMap = genreList.reduce((acc, genre) => {
          acc[genre.id] = genre.name;
          return acc;
        }, {});

        setGenres(genreMap);

        const data = await getPopularMedia("movie"); // Especificar tipo "movie"
        if (!data.length) throw new Error("No hay películas disponibles.");
        setMovies(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="container mx-auto px-8 py-12">
      <h1 className="text-3xl font-bold text-white mb-6">Explorar Películas</h1>

      {loading && (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      )}

      {error && <Alert message={error} type="error" showIcon className="mb-4" />}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <MediaCard key={movie.id} movie={movie} genres={genres} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ExplorePage;
