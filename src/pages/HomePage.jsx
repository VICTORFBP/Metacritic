import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MediaCard from "../components/movie/MediaCard";
import { Spin, Alert, Pagination } from "antd";
import { getPopularMedia, getGenres } from "../services/apiService";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [genres, setGenres] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = parseInt(searchParams.get("page")) || 1;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Obtener géneros de películas y series
        const [moviesGenres, seriesGenres] = await Promise.all([
          getGenres("movie"),
          getGenres("tv"),
        ]);

        // Crear un mapa de géneros combinando películas y series
        const genreMap = {};
        [...moviesGenres, ...seriesGenres].forEach((genre) => {
          genreMap[genre.id] = genre.name;
        });

        setGenres(genreMap);

        // Obtener películas y series populares
        const [moviesData, seriesData] = await Promise.all([
          getPopularMedia("movie", currentPage),
          getPopularMedia("tv", currentPage),
        ]);

        setMovies(moviesData);
        setSeries(seriesData);
      } catch (err) {
        setError(err.message || "Error al cargar el contenido.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setSearchParams({ page });
  };

  return (
    <div className="mx-auto max-w-screen-2xl px-6 py-8">
      <h1 className="text-3xl font-bold text-black mb-6 text-center">
        🎬 Películas y Series Destacadas
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
        <>
          {/* Sección de Películas */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-400 mb-4">🎥 Películas Populares</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {movies.map((movie) => (
                <MediaCard key={movie.id} movie={movie} genres={genres} />
              ))}
            </div>
          </section>

          {/* Sección de Series */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-400 mb-4">📺 Series Populares</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {series.map((serie) => (
                <MediaCard key={serie.id} movie={serie} genres={genres} />
              ))}
            </div>
          </section>
        </>
      )}

      {/* Paginación */}
      <div className="flex justify-center mt-6">
        <Pagination
          current={currentPage}
          total={500 * 20}
          pageSize={20}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default HomePage;
