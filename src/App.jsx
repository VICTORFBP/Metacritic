import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/common/Navbar"; // Componente de navegación principal
import Footer from "./components/common/Footer"; // Componente de pie de página
import "./main.css"; // Estilos principales de la aplicación

const App = () => {
  return (
    // Contenedor principal con estilos de fondo y texto
    <div className="bg-background text-textPrimary min-h-screen">
      <Navbar /> {/* Barra de navegación */}
      <main className="flex-grow"> {/* Contenedor principal para el contenido dinámico */}
        <Outlet /> {/* Renderiza las rutas hijas */}
      </main>
      <Footer /> {/* Pie de página */}
    </div>
  );
};

export default App; // Exporta el componente principal de la aplicación
