import { useEffect, useState } from "react";
import MediaCard from "../components/movie/MediaCard";
import { Spin, Alert, Pagination } from "antd";
import { getPopularMedia } from "../services/apiService";

// Componente principal para mostrar las series populares
const SeriesPage = () => {
  // Estados para manejar las series, el estado de carga, errores y la página actual
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Efecto para cargar las series cuando cambia la página actual
  useEffect(() => {
    const fetchSeries = async () => {
      setLoading(true);
      setError(null);
      try {
        // Llamada al servicio para obtener las series populares
        const data = await getPopularMedia("tv", currentPage);
        if (!data.length) throw new Error("No se encontraron series.");
        setSeries(data);
      } catch (err) {
        // Manejo de errores en caso de fallo en la carga
        setError(err.message || "Error al cargar las series.");
      } finally {
        setLoading(false);
      }
    };

    fetchSeries();
  }, [currentPage]);

  return (
    <div className="mx-auto max-w-screen-2xl px-6 py-8">
      {/* Título de la página */}
      <h1 className="text-3xl font-bold text-black mb-6 text-center">
        📺 Series Populares
      </h1>

      {/* Indicador de carga */}
      {loading && (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      )}

      {/* Mensaje de error */}
      {error && (
        <div className="mb-4">
          <Alert message={error} type="error" showIcon />
        </div>
      )}

      {/* Lista de series */}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {series.map((serie) => (
            <MediaCard key={serie.id} movie={serie} />
          ))}
        </div>
      )}

      {/* Paginación */}
      <div className="flex justify-center mt-6">
        <Pagination
          current={currentPage}
          total={500 * 20} // Total estimado de elementos
          pageSize={20} // Número de elementos por página
          onChange={setCurrentPage}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default SeriesPage;
