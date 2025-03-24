import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import "./main.css";

const App = () => {
  return (
    <div className="bg-background text-textPrimary min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};


export default App;
