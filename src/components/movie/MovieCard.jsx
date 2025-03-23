import { Card, Rate, Tag } from "antd";
import { Link } from "react-router-dom";

const { Meta } = Card;

// Función para truncar texto
const truncateText = (text, limit) => {
  return text.length > limit ? text.substring(0, limit) + "..." : text;
};

// Colores para los géneros
const genreColors = {
  Acción: "bg-red-500/20 text-red-300",
  Aventura: "bg-blue-500/20 text-blue-300",
  Ciencia_ficción: "bg-green-500/20 text-green-300",
  Drama: "bg-purple-500/20 text-purple-300",
  Fantasía: "bg-yellow-500/20 text-yellow-300",
  Suspense: "bg-pink-500/20 text-pink-300",
  Comedia: "bg-indigo-500/20 text-indigo-300",
};

const MovieCard = ({ movie, genres }) => {
  return (
    <Card
      hoverable
      cover={
        <img
          alt={movie.title}
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          className="rounded-t-lg"
        />
      }
      className="w-full sm:w-64 md:w-72 bg-gray-800 text-white shadow-lg transition-transform duration-300 transform hover:scale-105"
    >
      {/* Título de la película */}
      <Meta 
        title={<span className="text-white font-semibold">{movie.title}</span>} 
        description={<p className="text-gray-300">{truncateText(movie.overview || "Sin descripción", 100)}</p>} 
      />

      {/* Año de lanzamiento */}
      <p className="text-gray-400 mt-3">🎬 Año: {movie.release_date ? movie.release_date.split("-")[0] : "Desconocido"}</p>

      {/* Calificación con estrellas */}
      <Rate disabled defaultValue={movie.vote_average / 2} className="mt-2" />

      {/* Géneros con colores dinámicos */}
      <div className="mt-2 flex flex-wrap gap-1">
        {movie.genre_ids?.map((genreId) => (
          <Tag 
            key={genreId} 
            className={`px-2 py-1 rounded-md text-sm ${genreColors[genres[genreId]] || "bg-gray-600/20 text-gray-300"}`}
          >
            {genres[genreId] || "Desconocido"}
          </Tag>
        ))}
      </div>

      {/* Idioma original */}
      <p className="text-gray-400 mt-3">🌍 Idioma: {movie.original_language.toUpperCase()}</p>

      {/* Botón de detalles */}
      <Link to={`/movie/${movie.id}`} className="text-blue-400 hover:text-blue-300 hover:underline block mt-3 font-semibold">
        ➤ Ver detalles
      </Link>
    </Card>
  );
};

export default MovieCard;
