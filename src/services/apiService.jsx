import axios from "axios";

const API_TOKEN = "";
const BASE_URL = "https://api.themoviedb.org/3";

const apiService = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
    "Content-Type": "application/json",
  },
  params: {
    language: "es-ES",
  },
});

// Obtener películas populares
export const getPopularMovies = async () => {
  try {
    const response = await apiService.get("/movie/popular");
    return response.data.results;
  } catch (error) {
    console.error("Error al obtener películas populares:", error);
    return [];
  }
};

// Obtener detalles de una película
export const getMovieDetails = async (movieId) => {
  try {
    const response = await apiService.get(`/movie/${movieId}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener detalles de la película:", error);
    return null;
  }
};

// Buscar películas por nombre
export const searchMovies = async (query) => {
  try {
    const response = await apiService.get("/search/movie", { params: { query } });
    return response.data.results;
  } catch (error) {
    console.error("Error en la búsqueda de películas:", error);
    return [];
  }
};

// Obtener lista de géneros
export const getGenres = async () => {
  try {
    const response = await apiService.get("/genre/movie/list");
    return response.data.genres;
  } catch (error) {
    console.error("Error al obtener los géneros:", error);
    return [];
  }
};

export default apiService;
