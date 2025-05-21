import { useEffect, useState } from "react";
import MediaCard from "../components/movie/MediaCard";
import { Spin, Alert } from "antd";
import { getPopularMedia } from "../services/apiService";

// Componente principal para mostrar la página de películas populares
const MoviesPage = () => {
  // Estado para almacenar las películas, el estado de carga y los errores
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Efecto para cargar las películas populares al montar el componente
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        // Llamada al servicio para obtener las películas populares
        const data = await getPopularMedia("movie");
        if (data.length === 0) throw new Error("No se encontraron películas.");
        setMovies(data);
      } catch (err) {
        // Manejo de errores en caso de fallo en la carga
        setError(err.message || "Error al cargar las películas.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="mx-auto max-w-screen-2xl px-6 py-8">
      {/* Título de la página */}
      <h1 className="text-3xl font-bold text-black mb-6 text-center">
        🎬 Películas Populares
      </h1>

      {/* Indicador de carga */}
      {loading && (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      )}

      {/* Mensaje de error */}
      {error && (
        <div className="mb-4">
          <Alert message={error} type="error" showIcon />
        </div>
      )}

      {/* Lista de películas populares */}
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
