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
    language: "es-MX",
  },
});

/**
 * Obtener contenido popular (películas o series).
 * @param {string} type - Tipo de contenido ("movie" para películas, "tv" para series).
 * @param {number} page - Número de página para la paginación.
 * @returns {Promise<Array>} Lista de contenido popular.
 */
export const getPopularMedia = async (type = "movie", page = 1) => {
  try {
    const response = await apiService.get(`/${type}/popular`, {
      params: { page },
    });
    return response.data.results;
  } catch (error) {
    console.error(`Error al obtener ${type} populares:`, error);
    return [];
  }
};

/**
 * Obtener detalles de una película o serie.
 * @param {number} id - ID del contenido.
 * @param {string} type - Tipo de contenido ("movie" para películas, "tv" para series).
 * @returns {Promise<Object|null>} Detalles del contenido o null si ocurre un error.
 */
export const getMediaDetails = async (id, type = "movie") => {
  try {
    const response = await apiService.get(`/${type}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener detalles de ${type}:`, error);
    return null;
  }
};

/**
 * Buscar películas o series por nombre.
 * @param {string} query - Término de búsqueda.
 * @param {string} type - Tipo de búsqueda ("multi", "movie" o "tv").
 * @returns {Promise<Array>} Resultados de la búsqueda.
 */
export const searchMedia = async (query, type = "multi") => {
  try {
    const response = await apiService.get(`/search/${type}`, {
      params: { query: encodeURIComponent(query) },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error en la búsqueda:", error);
    return [];
  }
};

/**
 * Obtener lista de géneros (películas o series).
 * @param {string} type - Tipo de contenido ("movie" para películas, "tv" para series).
 * @returns {Promise<Array>} Lista de géneros.
 */
export const getGenres = async (type = "movie") => {
  try {
    const response = await apiService.get(`/genre/${type}/list`);
    return response.data.genres;
  } catch (error) {
    console.error(`Error al obtener géneros de ${type}:`, error);
    return [];
  }
};

/**
 * Obtener tráiler de una película o serie.
 * @param {number} id - ID del contenido.
 * @param {string} type - Tipo de contenido ("movie" para películas, "tv" para series).
 * @returns {Promise<string|null>} Clave del tráiler en YouTube o null si no se encuentra.
 */
export const getMediaTrailer = async (id, type = "movie") => {
  try {
    const response = await apiService.get(`/${type}/${id}/videos`);
    const videos = response.data.results;
    const trailer = videos.find(video => video.type === "Trailer" && video.site === "YouTube");
    return trailer ? trailer.key : null;
  } catch (error) {
    console.error(`Error al obtener tráiler de ${type}:`, error);
    return null;
  }
};

export default apiService;
