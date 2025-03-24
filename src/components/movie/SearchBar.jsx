import { useState } from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => setQuery(e.target.value);
  const submitSearch = () => {
    if (query.trim()) {
      navigate(`/search/${query}`);
    }
  };

  return (
    <div className="relative flex items-center">
      <Input
        placeholder ="Buscar"
        value={query}
        onChange={handleSearch}
        onPressEnter={submitSearch}
        className="bg-white/10 text-gray-400 placeholder-white opacity-100 px-4 py-2 rounded-full w-80 border-none 
                   focus:outline-none focus:ring-10"
        style={{
          backdropFilter: "blur(5px)",
          backgroundColor: "rgba(56, 100, 194, 0.12)",
        }}
        prefix={<SearchOutlined className="text-gray-300 cursor-pointer" onClick={submitSearch} />}
      />
    </div>
  );
};

export default SearchBar;
