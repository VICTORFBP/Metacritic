import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/HomePage";
import ExplorePage from "../pages/ExplorePage";
import MovieDetailsPage from "../pages/MovieDetailsPage";
import ProfilePage from "../pages/ProfilePage";
import SearchResults from "../pages/SearchResults";
import MoviesPage from "../pages/MoviePage";
import SeriesPage from "../pages/SeriesPage";

const router = createBrowserRouter([
  {
    path: "/", // Ruta principal
    element: <App />, // Componente principal que envuelve las rutas hijas
    children: [
      { path: "", element: <HomePage /> }, // Página de inicio
      { path: "explore", element: <ExplorePage /> }, // Página para explorar contenido
      { path: "profile/:user_id", element: <ProfilePage /> }, // Página de perfil del usuario
      { path: "search/:query", element: <SearchResults /> }, // Resultados de búsqueda dinámicos
      { path: "movie/:id", element: <MovieDetailsPage /> }, // Detalles de una película específica
      { path: "/movies", element: <MoviesPage /> }, // Página de listado de películas
      { path: "/series", element: <SeriesPage /> }, // Página de listado de series
    ],
  },
]);

export default router;
