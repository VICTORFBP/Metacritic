import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { searchMedia, getGenres } from "../services/apiService";
import MediaCard from "../components/movie/MediaCard";
import { Spin, Alert } from "antd";

const SearchResults = () => {
  // Obtener parámetros de búsqueda desde la URL
  const { query, type } = useParams();
  const [media, setMedia] = useState([]);
  const [genres, setGenres] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Efecto para buscar contenido y géneros al cargar o cambiar los parámetros
  useEffect(() => {
    const fetchResults = async () => {
      try {
        // Obtener lista de géneros y mapearlos
        const genreList = await getGenres(type);
        const genreMap = genreList.reduce((acc, genre) => {
          acc[genre.id] = genre.name;
          return acc;
        }, {});

        setGenres(genreMap);

        // Buscar contenido basado en la consulta y el tipo
        const results = await searchMedia(query, type);
        if (results.length === 0) throw new Error("No se encontraron resultados.");
        setMedia(results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query, type]);

  return (
    <div className="container mx-auto px-8 py-12">
      {/* Título de la página */}
      <h1 className="text-3xl font-bold text-white mb-6">Resultados para: "{query}"</h1>

      {/* Indicador de carga */}
      {loading && (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      )}

      {/* Mensaje de error */}
      {error && <Alert message={error} type="error" showIcon className="mb-4" />}

      {/* Lista de resultados */}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {media.map((item) => (
            <MediaCard key={item.id} movie={item} genres={genres} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
