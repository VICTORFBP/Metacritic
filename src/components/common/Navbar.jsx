import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import logo from "../../assets/logoapp.png";
import { Button } from "antd";
import SearchBar from "../movie/SearchBar";

const Navbar = () => {
  return (
    <header className="bg-background bg-opacity-90 fixed w-full top-0 z-50 shadow-lg backdrop-blur-md">
      <div className="container mx-auto px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="logo" className="h-12" />
          <span className="text-textPrimary text-2xl font-bold">Metacritic</span>
        </Link>

        {/* Menú de navegación */}
        <nav className="flex gap-8 text-lg text-textPrimary">
          <Link to="/" className="hover:text-linkHover transition">Inicio</Link>
          <Link to="/movies" className="hover:text-linkHover transition">Películas</Link>
          <Link to="/series" className="hover:text-linkHover transition">Series</Link>
        </nav>

        {/* Barra de búsqueda y usuario */}
        <div className="flex items-center gap-4">
          <SearchBar />
          <Button
            type="primary"
            shape="circle"
            icon={<UserOutlined />}
            className="bg-button hover:bg-buttonHover border-none"
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
