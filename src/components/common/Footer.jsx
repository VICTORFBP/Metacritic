import { FacebookOutlined, TwitterOutlined, InstagramOutlined, YoutubeOutlined } from "@ant-design/icons";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          {/* Sección 1: Logo y descripción */}
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold text-white">Metacritic</h2>
            <p className="text-sm mt-2">
              Descubre, califica y encuentra dónde ver tus películas y series favoritas.
            </p>
          </div>

          {/* Sección 2: Redes Sociales */}
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500">
              <FacebookOutlined className="text-2xl" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400">
              <TwitterOutlined className="text-2xl" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500">
              <InstagramOutlined className="text-2xl" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500">
              <YoutubeOutlined className="text-2xl" />
            </a>
          </div>
        </div>

        {/* Línea divisoria */}
        <hr className="border-gray-700 my-4" />

        {/* Derechos de autor */}
        <p className="text-center text-sm">&copy; {new Date().getFullYear()} Metacritic - Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
