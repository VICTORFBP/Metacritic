import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import "./main.css";
const App = () => {
  return (
    <main>
      <Navbar />
      <div>
        <Outlet />
      </div>
    </main>
  );
};
export default App;
