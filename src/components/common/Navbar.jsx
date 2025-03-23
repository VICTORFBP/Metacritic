import { Link } from "react-router-dom";
import { UserOutlined, SearchOutlined } from "@ant-design/icons";
import logo from "../../assets/logoapp.png";
import { Input, Button } from "antd";
const Navbar = () => {
  return (
    <header className="flex items-center justify-between bg-gray-900 p-4 text-white">
      <img src={logo} alt="logo" className="h-10" />
      <nav className="flex gap-4">
        <Link to="/" className="hover:text-blue-400">Inicio</Link>
        <Link to="/movies" className="hover:text-blue-400">Películas</Link>
        <Link to="/series" className="hover:text-blue-400">Series</Link>
      </nav>
      <div className="flex items-center gap-2">
        <Input placeholder="Buscar aquí..." prefix={<SearchOutlined />} className="bg-gray-800 text-white" />
        <Button type="primary" shape="circle" icon={<UserOutlined />} />
      </div>
    </header>
  );
};

export default Navbar;
