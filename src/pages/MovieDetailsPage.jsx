import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMediaDetails, getMediaTrailer } from "../services/apiService";
import { Spin, Alert, Tag, Button, Input, Rate, message } from "antd";
import {
  StarFilled,
  EditOutlined,
  SaveOutlined,
  CloseOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import ReviewForm from "../components/movie/ReviewForm";

const MovieDetailsPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [editRating, setEditRating] = useState(0);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    setEditingCommentId(null);
    setEditContent("");
    setEditRating(0);
    setComments([]);
  }, [id]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const data = await getMediaDetails(id, "movie");
        if (!data) throw new Error("No se encontraron detalles para esta película.");
        setMovie(data);

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

  const fetchComments = () => {
    fetch(`http://localhost:8081/comment/movie/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar los comentarios");
        return res.json();
      })
      .then((data) => setComments(data))
      .catch((err) => {
        console.error(err);
        message.error(err.message);
      });
  };

  useEffect(() => {
    fetchComments();
  }, [id]);

  const startEdit = (comment) => {
    setEditingCommentId(comment.comment_id);
    setEditContent(comment.comment_content);
    setEditRating(comment.comment_rating);
  };

  const cancelEdit = () => {
    setEditingCommentId(null);
    setEditContent("");
    setEditRating(0);
  };

  const saveEdit = async () => {
    if (!user) return message.warning("Debes iniciar sesión para editar.");

    if (!editContent.trim()) return message.warning("El comentario no puede estar vacío.");
    if (editRating === 0) return message.warning("Por favor, asigna una calificación.");

    try {
      const res = await fetch(`http://localhost:8081/api/review/${editingCommentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          comment: editContent,
          rating: editRating,
          userId: user.user_id,
        }),
      });

      if (!res.ok) throw new Error("Error al editar la reseña");

      message.success("Reseña editada correctamente");
      cancelEdit();
      fetchComments();
    } catch (err) {
      console.error(err);
      message.error("No se pudo editar la reseña");
    }
  };

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
      <div className="absolute inset-0 bg-black opacity-60"></div>

      <div className="relative bg-gray-900 bg-opacity-90 p-6 rounded-lg shadow-lg max-w-4xl w-full flex flex-col md:flex-row">
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "/fallback-image.jpg"
          }
          alt={movie.title}
          className="w-64 h-auto rounded-lg shadow-lg md:ml-4"
        />
        <div className="md:ml-6 flex flex-col justify-between">
          <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
          {movie.tagline && <p className="text-lg italic text-gray-300">"{movie.tagline}"</p>}

          <div className="flex items-center text-yellow-400 mb-2">
            <StarFilled className="text-lg mr-2" />
            <span className="text-white">{movie.vote_average.toFixed(1)} / 10</span>
          </div>

          <div className="mb-3">
            {movie.genres &&
              movie.genres.map((genre) => (
                <Tag key={genre.id} color="blue" className="mr-1">
                  {genre.name}
                </Tag>
              ))}
          </div>

          <p className="text-gray-300 mb-3">
            <span className="font-semibold">📅 Estreno:</span>{" "}
            {new Date(movie.release_date).toLocaleDateString()}
          </p>

          <p className="text-gray-300 text-sm leading-6 max-w-lg mb-4">
            {movie.overview || "No hay descripción disponible para esta película."}
          </p>

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

      <div className="relative bg-gray-900 bg-opacity-90 p-6 rounded-lg shadow-lg max-w-4xl w-full mt-8">
        <h2 className="text-2xl font-bold text-white mb-4">🎬 Tráiler</h2>
        {trailerKey ? (
          <div className="flex justify-center">
            <iframe
              width="800"
              height="450"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title={`${movie.title} - Tráiler`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg shadow-lg w-full"
            />
          </div>
        ) : (
          <p className="text-gray-400 text-center">
            ❌ No hay tráiler disponible para esta película.
          </p>
        )}
      </div>

      <div className="relative text-gray-300 bg-gray-900 bg-opacity-90 rounded-lg shadow-lg max-w-4xl w-full mt-8 px-5 py-6">
        <h2 className="text-2xl font-bold text-white mb-4">💬 Comentarios</h2>

        {comments.length !== 0 ? (
          comments.map((comment) => (
            <div key={`${comment.comment_id}`} className="py-1.5 px-5">
              <article className="bg-gray-800 bg-opacity-50 shadow-lg rounded-3xl">
                <div className="flex gap-3 px-5 bg-gray-800 bg-opacity-90 rounded-t-3xl h-8 items-center">
                  <Link to={`/profile/${comment.user_id}`}>
                    <h1 className="text-xl cursor-pointer hover:underline">
                      {comment.user_name} {comment.user_lastname}
                    </h1>
                  </Link>
                  <div className="flex items-center text-yellow-400 ml-auto">
                    <StarFilled className="text-lg mr-2" />
                    <span className="text-white">{comment.comment_rating} / 10</span>
                  </div>

                  {/* Botón editar solo para el propio usuario */}
                  {user && user.user_id === comment.user_id && (
                    <>
                      {editingCommentId === comment.comment_id ? (
                        <>
                          <Button
                            type="link"
                            icon={<SaveOutlined />}
                            onClick={saveEdit}
                            className="text-green-400"
                          />
                          <Button
                            type="link"
                            icon={<CloseOutlined />}
                            onClick={cancelEdit}
                            className="text-red-400"
                          />
                        </>
                      ) : (
                        <Button
                          type="link"
                          icon={<EditOutlined />}
                          onClick={() => startEdit(comment)}
                          className="text-blue-400"
                        />
                      )}
                    </>
                  )}
                </div>

                {/* Mostrar formulario edición o comentario normal */}
                {editingCommentId === comment.comment_id ? (
                  <div className="p-4">
                    <Input.TextArea
                      rows={4}
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="mb-3 bg-gray-700 text-white"
                    />
                    <Rate
                      value={editRating}
                      onChange={(value) => setEditRating(value)}
                      className="mb-3"
                    />
                  </div>
                ) : (
                  <p className="px-6 py-3 h-full min-h-20">{comment.comment_content}</p>
                )}
              </article>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center py-2">
            ❌ No hay comentarios disponible para esta película
          </p>
        )}

        <ReviewForm movieId={id} movieName={movie.title} onReviewSubmitted={fetchComments} />
      </div>
    </div>
  );
};

export default MovieDetailsPage;
