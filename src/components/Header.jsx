import React from "react";
import logo from "../assets/logoApp.png";// Asegúrate de tener este icono
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <img src={logo} alt="logo" className="logo" />
      <nav>
        <a href="#movies">Movies</a>
        <a href="#tvshows">TV Shows</a>
      </nav>
      <div className="search-bar">
        <input type="text" placeholder="Search here..." />
        <button type="submit"></button>
      </div>
      <img src="" alt="profile" className="profile-icon" />
    </div>
  );
};

export default Header;