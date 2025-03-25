import { useState, useEffect, useRef } from "react";
import { Input, Spin } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";
import { searchMedia } from "../../services/apiService";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null); // Referencia para detectar clics fuera

  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = debounce(async () => {
      setLoading(true);
      try {
        const results = await searchMedia(query);
        setSuggestions(results.slice(0, 5)); // Muestra solo las 5 primeras sugerencias
      } catch (error) {
        console.error("Error al obtener sugerencias:", error);
      } finally {
        setLoading(false);
      }
    }, 300);

    fetchSuggestions();
    return () => fetchSuggestions.cancel();
  }, [query]);

  // Maneja la búsqueda y limpia las sugerencias
  const submitSearch = () => {
    if (query.trim()) {
      navigate(`/search/${query}`);
      setSuggestions([]); // Oculta las sugerencias
    }
  };

  // Detecta clics fuera del input para cerrar las sugerencias
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSuggestions([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={searchRef} className="relative flex flex-col items-center w-80">
      <Input
        placeholder="Buscar películas o series..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onPressEnter={submitSearch}
        className="bg-white/10 text-gray-200 placeholder-gray-400 px-4 py-2 rounded-full w-full border-none 
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
        style={{ backdropFilter: "blur(5px)", backgroundColor: "rgba(56, 100, 194, 0.12)" }}
        prefix={<SearchOutlined className="text-gray-300 cursor-pointer" onClick={submitSearch} />}
      />
      
      {/* Sugerencias */}
      {query && suggestions.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-gray-800 text-white rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {loading && (
            <div className="p-2 text-center">
              <Spin size="small" />
            </div>
          )}
          {!loading &&
            suggestions.map((item) => (
              <div
                key={item.id}
                className="p-2 hover:bg-gray-700 cursor-pointer transition"
                onClick={() => {
                  navigate(`/movie/${item.id}`);
                  setSuggestions([]); // Oculta las sugerencias al hacer clic
                }}
              >
                {item.title || item.name}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
