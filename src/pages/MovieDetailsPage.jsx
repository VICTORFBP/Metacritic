import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../services/apiService";
import { Spin, Alert, Tag, Button } from "antd";
import { StarFilled, PlayCircleOutlined } from "@ant-design/icons";

const MovieDetailsPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const data = await getMovieDetails(id);
        if (!data)
          throw new Error("No se encontraron detalles para esta película.");
        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );

  if (error)
    return (
      <Alert
        message="Error al cargar la película"
        description={error}
        type="error"
        showIcon
        className="text-center mt-6"
      />
    );

  return (
    <div
      className="min-h-screen pt-20 pb-8 bg-gray-900 text-white flex flex-col items-center"
      style={{
        backgroundImage: movie.backdrop_path
          ? `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`
          : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      {/* Capa de oscurecimiento para mejorar la legibilidad */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      {/* Contenido principal */}
      <div className="relative bg-gray-900 bg-opacity-90 p-6 rounded-lg shadow-lg max-w-4xl w-full flex flex-col md:flex-row">
        {/* Imagen de la película */}
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "/fallback-image.jpg"
          }
          alt={movie.title}
          className="w-64 h-auto rounded-lg shadow-lg md:ml-4"
        />

        {/* Detalles */}
        <div className="md:ml-6 flex flex-col justify-between">
          <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
          {movie.tagline && (
            <p className="text-lg italic text-gray-300">"{movie.tagline}"</p>
          )}

          {/* Calificación */}
          <div className="flex items-center text-yellow-400 mb-2">
            <StarFilled className="text-lg mr-2" />
            <span className="text-white">
              {movie.vote_average.toFixed(1)} / 10
            </span>
          </div>

          {/* Géneros */}
          <div className="mb-3">
            {movie.genres.map((genre) => (
              <Tag key={genre.id} color="blue" className="mr-1">
                {genre.name}
              </Tag>
            ))}
          </div>

          {/* Fecha de estreno */}
          <p className="text-gray-300 mb-3">
            <span className="font-semibold">📅 Estreno:</span>{" "}
            {new Date(movie.release_date).toLocaleDateString()}
          </p>

          {/* Descripción */}
          <p className="text-gray-300 text-sm leading-6 max-w-lg">
            {movie.overview ||
              "No hay descripción disponible para esta película."}
          </p>

          {/* Botón de streaming */}
          {movie.homepage && (
            <Button
              type="primary"
              icon={<PlayCircleOutlined />}
              href={movie.homepage}
              target="_blank"
              className="mt-4 bg-blue-500 border-none"
            >
              Ver en Streaming
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
