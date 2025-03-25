import { Card, Rate, Tag } from "antd";
import { Link } from "react-router-dom";

const { Meta } = Card;

// Función para truncar texto
const truncateText = (text, limit) => {
  return text?.length > limit ? text.substring(0, limit) + "..." : text || "Sin descripción";
};

// Colores mejorados para los géneros
const genreColors = {
  Acción: "bg-red-600/30 text-red-300",
  Aventura: "bg-blue-600/30 text-blue-300",
  Ciencia_ficción: "bg-green-600/30 text-green-300",
  Drama: "bg-purple-600/30 text-purple-300",
  Fantasía: "bg-yellow-600/30 text-yellow-300",
  Suspense: "bg-pink-600/30 text-pink-300",
  Comedia: "bg-indigo-600/30 text-indigo-300",
};

const MediaCard = ({ movie, genres = {} }) => {
  const isMovie = movie.title !== undefined; // Si tiene `title`, es una película; si no, es una serie.

  return (
    <Card
      hoverable
      cover={
        movie.poster_path ? (
          <img
            alt={isMovie ? movie.title : movie.name}
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            className="rounded-t-lg"
          />
        ) : (
          <div className="bg-gray-700 w-full h-72 flex items-center justify-center text-gray-300">
            Imagen no disponible
          </div>
        )
      }
      className="w-full sm:w-64 md:w-72 bg-gray-800 text-white shadow-lg transition-transform duration-300 transform hover:scale-105"
    >
      <Meta 
        title={<span className="text-white font-bold">{movie.title || movie.name || "Título no disponible"}</span>} 
        description={<p className="text-gray-300">{truncateText(movie.overview, 100)}</p>} 
      />

      {/* Año de lanzamiento (se ajusta para películas y series) */}
      <p className="text-gray-400 mt-3">
        📅 Año: {movie.release_date?.split("-")[0] || movie.first_air_date?.split("-")[0] || "Desconocido"}
      </p>

      {/* Calificación */}
      <Rate disabled defaultValue={movie.vote_average ? movie.vote_average / 2 : 0} className="mt-2" />

      {/* Géneros con mejor contraste */}
      <div className="mt-2 flex flex-wrap gap-1">
        {Array.isArray(movie.genre_ids) && movie.genre_ids.length > 0 ? (
          movie.genre_ids.map((genreId) => (
            <Tag 
              key={genreId} 
              className={`px-2 py-1 rounded-md text-sm ${genreColors[genres[genreId]] || "bg-gray-700 text-gray-300"}`}
            >
              {genres[genreId] || "Desconocido"}
            </Tag>
          ))
        ) : (
          <p className="text-gray-400 text-sm">Género no disponible</p>
        )}
      </div>

      {/* Idioma */}
      <p className="text-gray-400 mt-3">🌍 Idioma: {movie.original_language ? movie.original_language.toUpperCase() : "N/A"}</p>

      {/* Enlace para ver detalles (ajustado para películas y series) */}
      <Link
        to={`/${isMovie ? "movie" : "tv"}/${movie.id}`}
        className="text-blue-400 hover:text-blue-300 hover:underline block mt-3 font-semibold"
      >
        ➤ Ver detalles
      </Link>
    </Card>
  );
};

export default MediaCard;
