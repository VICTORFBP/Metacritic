import { Link, useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import logo from "../../assets/logoApp.png";
import { Button, Dropdown, Menu } from "antd";
import SearchBar from "../movie/SearchBar";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const menu = (
    <Menu>
      <Menu.Item key="profile" onClick={() => navigate(`/profile/${user.user_id}`)}>
        Mi Perfil
      </Menu.Item>
      <Menu.Item key="logout" onClick={handleLogout}>
        Cerrar sesión
      </Menu.Item>
    </Menu>
  );

  return (
    <header className="bg-background bg-opacity-90 fixed w-full top-0 z-50 shadow-lg backdrop-blur-md">
      <div className="container mx-auto px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="logo" className="h-12" />
          <span className="text-textPrimary text-2xl font-bold">Metacritic</span>
        </Link>

        {/* Menú */}
        <nav className="flex gap-8 text-lg text-textPrimary">
          <Link to="/" className="hover:text-linkHover transition">Inicio</Link>
          <Link to="/movies" className="hover:text-linkHover transition">Películas</Link>
          <Link to="/series" className="hover:text-linkHover transition">Series</Link>
        </nav>

        {/* Búsqueda y usuario */}
        <div className="flex items-center gap-4">
          <SearchBar />
          {user ? (
            <Dropdown overlay={menu} placement="bottomRight">
              <Button
                shape="circle"
                icon={<UserOutlined />}
                className="bg-button hover:bg-buttonHover border-none"
              />
            </Dropdown>
          ) : (
            <Link to="/login">
              <Button
                type="primary"
                shape="circle"
                icon={<UserOutlined />}
                className="bg-button hover:bg-buttonHover border-none"
              />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
