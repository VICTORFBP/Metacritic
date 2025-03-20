import React from "react";
import logo from "../assets/logoApp.png";
import "./Header.css";
import {UserOutlined} from "@ant-design/icons"
import { Button } from "antd";
const Header = () => {
  return (
    <div className="header">
      <img src={logo} alt="logo" className="logo" />
      <nav>
        <a href="#movies">Peliculas</a>
        <a href="#tvshows">Series</a>
      </nav>
      <div className="search-bar">
        <input type="text" placeholder="Buscar Aqui..." />
        <button type="submit"></button>
      </div>
        <Button className="icoLogin" type="primary" icon={<UserOutlined />}></Button>
    </div>
  );
};

export default Header;