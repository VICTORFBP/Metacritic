// Importación de las dependencias necesarias para la aplicación
import React from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './routes/index.jsx'

// Renderización de la aplicación principal en el elemento con id 'root'
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Proveedor de enrutamiento para manejar las rutas de la aplicación */}
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
