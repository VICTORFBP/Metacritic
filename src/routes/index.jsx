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
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "explore", element: <ExplorePage /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "search/:query", element: <SearchResults /> },
      { path: "movie/:id", element: <MovieDetailsPage /> },
      { path: "/movies", element: <MoviesPage /> },
      { path: "/series", element: <SeriesPage /> },
      
    ],
  },
]);

export default router;
