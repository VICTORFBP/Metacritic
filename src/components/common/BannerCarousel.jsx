import { useEffect, useState } from "react";
import { Carousel, Button } from "antd";
import { getPopularMedia, getMediaTrailer } from "../../services/apiService";
import { Link } from "react-router-dom";
import { PlayCircleOutlined } from "@ant-design/icons";

const BannerCarousel = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        // Obtener películas y series populares (5 + 5)
        const [popularMovies, popularSeries] = await Promise.all([
          getPopularMedia("movie"),
          getPopularMedia("tv"),
        ]);

        const combined = [...popularMovies.slice(0, 3), ...popularSeries.slice(0, 2)];

        // Obtener los trailers para cada uno
        const bannersWithTrailers = await Promise.all(
          combined.map(async (item) => {
            const type = item.title ? "movie" : "tv";
            const trailerKey = await getMediaTrailer(item.id, type);
            return { ...item, type, trailerKey };
          })
        );

        setBanners(bannersWithTrailers);
      } catch (error) {
        console.error("Error al cargar el carrusel:", error);
      }
    };

    fetchBanners();
  }, []);

  return (
    <div className="relative w-full mb-10">
      <Carousel autoplay effect="fade" dotPosition="bottom">
        {banners.map((item) => (
          <div key={`${item.type}-${item.id}`}>
            <div
              className="h-[500px] w-full bg-center bg-cover relative flex items-end"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`,
              }}
            >
              <div className="absolute inset-0 bg-black opacity-60"></div>

              <div className="relative z-10 p-8 max-w-2xl">
                <h2 className="text-white text-3xl font-bold mb-2">
                  {item.title || item.name}
                </h2>
                <p className="text-gray-300 mb-4 line-clamp-3">
                  {item.overview || "Sin descripción disponible."}
                </p>

                <div className="flex gap-3">
                  {/* Botón para ver más detalles */}
                  <Link to={`/${item.type}/${item.id}`}>
                    <Button
                      type="primary"
                      className="bg-blue-600 hover:bg-blue-500 border-none"
                    >
                      Ver Detalles
                    </Button>
                  </Link>

                  {/* Botón para ver tráiler si existe */}
                  {item.trailerKey && (
                    <a
                      href={`https://www.youtube.com/watch?v=${item.trailerKey}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        icon={<PlayCircleOutlined />}
                        className="bg-red-600 hover:bg-red-500 text-white border-none"
                      >
                        Ver Tráiler
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default BannerCarousel;
