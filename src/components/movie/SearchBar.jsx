import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const SearchBar = ({ onSearch }) => {
  return (
    <Input
      placeholder="Buscar película..."
      prefix={<SearchOutlined />}
      onChange={(e) => onSearch(e.target.value)}
      className="bg-gray-800 text-white w-full p-2 rounded-lg shadow-md"
    />
  );
};

export default SearchBar;
