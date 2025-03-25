import { useEffect, useState } from "react";
import MediaCard from "../components/movie/MediaCard";
import { Spin, Alert, Pagination } from "antd";
import { getPopularMedia } from "../services/apiService";

const SeriesPage = () => {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchSeries = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getPopularMedia("tv", currentPage);
        if (!data.length) throw new Error("No se encontraron series.");
        setSeries(data);
      } catch (err) {
        setError(err.message || "Error al cargar las series.");
      } finally {
        setLoading(false);
      }
    };

    fetchSeries();
  }, [currentPage]);

  return (
    <div className="mx-auto max-w-screen-2xl px-6 py-8">
      <h1 className="text-3xl font-bold text-black mb-6 text-center">
        📺 Series Populares
      </h1>

      {loading && (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      )}

      {error && (
        <div className="mb-4">
          <Alert message={error} type="error" showIcon />
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {series.map((serie) => (
            <MediaCard key={serie.id} movie={serie} />
          ))}
        </div>
      )}

      <div className="flex justify-center mt-6">
        <Pagination
          current={currentPage}
          total={500 * 20}
          pageSize={20}
          onChange={setCurrentPage}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default SeriesPage;
