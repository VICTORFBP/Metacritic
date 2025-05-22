import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMediaDetails, getMediaTrailer } from "../services/apiService";
import { Spin, Alert, Tag } from "antd";

const SeriesDetailsPage = () => {
  const { id } = useParams();
  const [series, setSeries] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await getMediaDetails(id, "tv");
        setSeries(data);
        const trailer = await getMediaTrailer(id, "tv");
        setTrailerKey(trailer);
      } catch (err) {
        setError("Error al cargar los detalles de la serie.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (error || !series) {
    return (
      <div className="max-w-screen-lg mx-auto mt-20">
        <Alert message={error || "Serie no encontrada"} type="error" showIcon />
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto px-6 pt-28 pb-16 text-white">
      {/* Banner principal */}
      <div
        className="relative rounded-xl overflow-hidden bg-cover bg-center mb-10 h-[450px]"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${series.backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent p-6 flex flex-col justify-end">
          <h1 className="text-4xl font-extrabold mb-2 drop-shadow-lg">{series.name}</h1>
          <p className="mb-4 text-gray-300 max-w-2xl line-clamp-4">
            {series.overview || "Sin descripción disponible."}
          </p>
        </div>
      </div>

      {/* Tráiler embebido si existe */}
      {trailerKey && (
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4">🎬 Tráiler</h2>
          <div className="relative w-full h-0 pb-[56.25%]">
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="Tráiler"
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {/* Información de la serie */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-xl font-bold mb-4">🗂️ Información General</h2>
          <p><strong>Fecha de estreno:</strong> {series.first_air_date}</p>
          <p><strong>Último episodio:</strong> {series.last_air_date}</p>
          <p><strong>Temporadas:</strong> {series.number_of_seasons}</p>
          <p><strong>Episodios:</strong> {series.number_of_episodes}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {series.genres.map((genre) => (
              <Tag key={genre.id} color="blue-inverse">{genre.name}</Tag>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">⭐ Calificación y Más</h2>
          <p><strong>Puntaje promedio:</strong> {series.vote_average}</p>
          <p><strong>Votos:</strong> {series.vote_count}</p>
          <p><strong>Idioma original:</strong> {series.original_language.toUpperCase()}</p>
          {series.homepage && (
            <p className="mt-2">
              <a
                href={series.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                Página oficial
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SeriesDetailsPage;
