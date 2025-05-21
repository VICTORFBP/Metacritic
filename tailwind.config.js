/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#00A8E8",       // Azul neón (detalles y enlaces)
        secondary: "#EAB308",     // Amarillo dorado (puntuaciones, estrellas)
        background: "#0F172A",    // Azul oscuro (fondo principal)
        card: "#1E293B",          // Azul grisáceo (fondos secundarios)
        textPrimary: "#F8FAFC",   // Blanco azulado (texto principal)
        textSecondary: "#94A3B8", // Gris claro (texto secundario)
        button: "#F43F5E",        // Rojo vibrante (botones principales)
        buttonHover: "#BE123C",   // Rojo oscuro (hover en botones)
        linkHover: "#0284C7",     // Azul intenso (hover en enlaces)
        action: "#9333EA",        // Púrpura (género de acción)
        animation: "#22C55E",     // Verde (género de animación)
        suspense: "#E11D48",      // Rojo oscuro (género de suspense)
        fantasy: "#F59E0B",       // Naranja (género de fantasía)
      },
    },
  },
  plugins: [],
};
