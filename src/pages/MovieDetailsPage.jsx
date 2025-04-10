import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMediaDetails, getMediaTrailer } from "../services/apiService";
import { Spin, Alert, Tag, Button } from "antd";
import { StarFilled, PlayCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:8081/comment/movie/";

const MovieDetailsPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const data = await getMediaDetails(id, "movie");
        if (!data)
          throw new Error("No se encontraron detalles para esta película.");
        setMovie(data);

        // Obtener tráiler
        const trailer = await getMediaTrailer(id, "movie");
        setTrailerKey(trailer);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(API_URL + id)
      .then((result) => result.json())
      .then((data) => setComments(data))
      .catch((err) => console.log(err));
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
      {/* Capa de oscurecimiento */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      {/* Contenedor principal */}
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
          <p className="text-gray-300 text-sm leading-6 max-w-lg mb-4">
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

      {/* Contenedor del tráiler */}
      <div className="relative bg-gray-900 bg-opacity-90 p-6 rounded-lg shadow-lg max-w-4xl w-full mt-8">
        <h2 className="text-2xl font-bold text-white mb-4">🎬 Tráiler</h2>
        {trailerKey ? (
          <div className="flex justify-center">
            <iframe
              width="800"
              height="450"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="Movie Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg shadow-lg w-full"
            ></iframe>
          </div>
        ) : (
          <p className="text-gray-400 text-center">
            ❌ No hay tráiler disponible para esta película.
          </p>
        )}
      </div>

      <div className="relative text-gray-300 bg-gray-900 bg-opacity-90 rounded-lg shadow-lg max-w-4xl w-full mt-8">
        <div className="justify-between px-5 py-6">
          <h2 className="text-2xl font-bold text-white mb-4">💬 Comentarios</h2>

          {comments.length != 0 ? (
            comments.map((comment) => (
              <div className="py-1.5 px-5">
                <article className=" bg-gray-800 bg-opacity-50 shadow-lg rounded-3xl">
                  <div className="flex gap-3 px-5 bg-gray-800 bg-opacity-90 rounded-t-3xl h-8">
                    <Link to={`/profile/${comment.user_id}`} asChild>
                      <h1 className="text-xl">
                        {comment.user_name} {comment.user_lastname}
                      </h1>
                    </Link>
                    <div className="flex items-center text-yellow-400 mb-2 py-4">
                      <StarFilled className="text-lg mr-2" />
                      <span className="text-white">
                        {comment.comment_rating} / 10
                      </span>
                    </div>
                  </div>
                  <p className="px-6 py-3 h-full min-h-20">
                    {comment.comment_content}
                  </p>
                </article>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center py-2">
              ❌ No hay comentarios disponible para esta película
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
