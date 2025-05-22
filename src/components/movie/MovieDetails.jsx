import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Spin, Button, Tag } from "antd";
import { StarFilled, HeartOutlined, PlayCircleOutlined } from "@ant-design/icons";
import ReviewForm from "./ReviewForm"; // Asegúrate de que esta ruta sea correcta

const API_KEY = "TU_API_KEY";
const BASE_URL = "https://api.themoviedb.org/3";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/movie/${id}`, {
          params: {
            api_key: API_KEY,
            language: "es-ES",
            append_to_response: "videos,credits",
          },
        });
        setMovie(response.data);
      } catch (error) {
        console.error("Error al obtener los detalles de la película:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (!movie) {
    return <p className="text-center text-gray-500 mt-10">No se encontraron detalles para esta película.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row">
        {/* Imagen de la película */}
        <div className="md:w-1/3">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="rounded-lg shadow-lg"
          />
        </div>

        {/* Información de la película */}
        <div className="md:w-2/3 md:ml-6">
          <h1 className="text-4xl font-bold text-gray-100">{movie.title}</h1>
          <p className="text-gray-300 text-sm mt-2">📅 {movie.release_date}</p>

          {/* Puntuación */}
          <div className="flex items-center mt-3">
            <StarFilled className="text-yellow-500 text-lg mr-2" />
            <span className="text-gray-200">{movie.vote_average.toFixed(1)} / 10</span>
          </div>

          {/* Géneros */}
          <div className="mt-4">
            {movie.genres.map((genre) => (
              <Tag key={genre.id} className="bg-blue-600/30 text-blue-300 border border-blue-400">
                {genre.name}
              </Tag>
            ))}
          </div>

          {/* Sinopsis */}
          <p className="mt-4 text-gray-200">{movie.overview}</p>

          {/* Botones */}
          <div className="mt-6 flex space-x-4">
            <Button type="primary" icon={<HeartOutlined />} className="bg-red-600 hover:bg-red-500 border-none">
              Agregar a Favoritos
            </Button>

            {movie.homepage && (
              <Button
                type="default"
                icon={<PlayCircleOutlined />}
                href={movie.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-500 text-white"
              >
                Ver en Streaming
              </Button>
            )}
          </div>

          {/* Reseña del usuario */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold text-white mb-4">Tu Reseña</h2>
            {user ? (
              <ReviewForm mediaId={movie.id} mediaName={movie.title} />
            ) : (
              <p className="text-gray-400 italic">
                Inicia sesión para dejar una reseña.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
