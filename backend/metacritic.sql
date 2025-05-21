-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-04-2025 a las 19:08:01
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `metacritic`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comments`
--

CREATE TABLE `comments` (
  `comment_id` int(11) NOT NULL,
  `comment_rating` int(2) NOT NULL,
  `comment_content` text NOT NULL,
  `comment_movieid` int(11) NOT NULL,
  `comment_moviename` text NOT NULL,
  `id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `comments`
--

INSERT INTO `comments` (`comment_id`, `comment_rating`, `comment_content`, `comment_movieid`, `comment_moviename`, `id_user`) VALUES
(75, 1, 'El CGI de la Reina esbozando el espejo mágico parece sacado de un videojuego de PS2. ¿Cómo gastaron $200 millones en esto? Las escenas del bosque tienen una iluminación tan plana que parece un escenario de teatro escolar. El príncipe tiene menos carisma que un extra de fondo.', 447273, 'Blanca Nieves', 3),
(76, 2, 'Los enanos digitales son una pesadilla uncanny valley: movimientos robóticos, expresiones faciales congeladas y voces que no sincronizan. La escena de la mina es tan oscura que literalmente no se ve nada. ¡Hasta el doblaje en español suena artificial!', 447273, 'Blanca Nieves', 8),
(77, 1, 'La \"reinvención feminista\" del cuento se reduce a Blanca Nieves dando discursos forzados cada 10 minutos. La supuesta \"escena épica\" contra el dragón es un slideshow de efectos mal renderizados. Mención \"honorable\" al vestuario que mezcla épocas históricas sin coherencia.', 447273, 'Blanca Nieves', 5),
(78, 2, 'Comparado con \"Maléfica\", esto es un insulto al género. Los supuestos giros modernos (como hacer a la Reina víctima del patriarcado) son tan sutiles como un martillazo. La secuencia musical del bosque dura 15 minutos interminables con coreografía de TikTok.', 447273, 'Blanca Nieves', 10),
(79, 1, 'La dirección de arte confunde \"oscuro\" con \"mal iluminado\". El diseño de la Reina parece copiado de \"Cruella\" pero sin presupuesto. ¿Por qué los animales del bosque tienen ese pelaje plástico que brilla como neón? Hasta el manzana envenenada parece de goma.', 447273, 'Blanca Nieves', 7),
(80, 3, 'El único mérito: la secuencia inicial del castillo en invierno tiene buena fotografía. Lástima que todo lo demás sea un desastre. Los diálogos entre los enanos suenan generados por IA, especialmente ese chiste sobre NFTs que nadie pidió.', 447273, 'Blanca Nieves', 4),
(81, 2, 'Edición tan brusca que parece faltar escenas completas. En un momento están en el castillo, luego en un pantano sin transición. La banda sonora usa versiones trap de las canciones clásicas que destruyen la nostalgia. ¿Quién aprobó esto?', 447273, 'Blanca Nieves', 1),
(82, 1, 'El clímax con el cazador redimido es tan predecible que duele. La Reina muere de la forma más anticlimática imaginable: un corte accidental con su propia corona. Los créditos finales son lo mejor: significan que terminó.', 447273, 'Blanca Nieves', 6),
(83, 5, 'La secuencia de construcción del refugio contra los creepers es puro ASMR cinematográfico. Cada sonido de bloque colocado está perfectamente sincronizado con la música. Hasta incluyeron el glitch clásico de caminar sobre lava con puerta de hierro.', 950387, 'Una película de Minecraft', 2),
(84, 4, 'El Nether está visualmente impresionante: lava que fluye con física realista y fortalezas piglin que mantienen el estilo voxel. Aunque el villano \"Herobrine\" es un cliché, la batalla final usando redstone y TNT justifica la entrada.', 950387, 'Una película de Minecraft', 9),
(85, 3, 'La trama es básica (salvar la aldea del Ender Dragon), pero los detalles técnicos enamoran: desde los biomas cambiantes hasta el fox que ayuda al protagonista. Extraño que no hayan incluido más mobs raros como el warden.', 950387, 'Una película de Minecraft', 5),
(86, 5, '¡Los créditos son un minijuego jugable en pantalla! Usando tu teléfono como mando, puedes moverte por un mapa estilo Superflat. Es el mejor post-créditos desde Deadpool. Hasta la derrota tiene el sonido \"oof\" clásico.', 950387, 'Una película de Minecraft', 10),
(87, 2, 'Demasiado tiempo dedicado a enseñar mecánicas básicas del juego (\"mira cómo corto madera\"). La subtrama romántica entre Steve y Alex fuerza química donde no la hay. Los diálogos de los aldeanos son graciosos al principio, luego repetitivos.', 950387, 'Una película de Minecraft', 7),
(88, 4, 'La textura pack cinematográfico da nuevo life a bloques clásicos: el agua tiene reflejos RTX y las nubes son volumétricas. La escena bajo el mar usando Respiration III es visualmente hipnótica. Los puristas odiarán los shaders, pero a mí me encantó.', 950387, 'Una película de Minecraft', 3),
(89, 3, 'Buena adaptación aunque con fanservice excesivo. El cameo de Notch se siente forzado y la escena de Minecon dura demasiado. Aprecio que mantuvieran la muerte de Steve sin sangre: fiel al rating E10+', 950387, 'Una película de Minecraft', 8),
(90, 5, 'El detalle de que los personajes solo muevan los brazos al correr es genial. La música combina tracks clásicos de C418 con nuevas orquestaciones. Hasta el end poem está parcialmente incluido en una escena onírica.', 950387, 'Una película de Minecraft', 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `role_id` int(11) NOT NULL,
  `role_name` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`role_id`, `role_name`) VALUES
(1, 'Admin'),
(2, 'User');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tags`
--

CREATE TABLE `tags` (
  `tag_id` int(11) NOT NULL,
  `tag_name` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tags`
--

INSERT INTO `tags` (`tag_id`, `tag_name`) VALUES
(1, 'Tecnología'),
(2, 'Deportes'),
(3, 'Música'),
(4, 'Comida'),
(5, 'Viajes'),
(6, 'Ciencia'),
(7, 'Arte'),
(8, 'Moda'),
(9, 'Videojuego'),
(10, 'Cine');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `userpreferences`
--

CREATE TABLE `userpreferences` (
  `userpreference_id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_tag` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `userpreferences`
--

INSERT INTO `userpreferences` (`userpreference_id`, `id_user`, `id_tag`) VALUES
(1, 1, 1),
(2, 1, 6),
(3, 1, 9),
(4, 2, 2),
(5, 2, 5),
(6, 3, 3),
(7, 3, 10),
(8, 4, 4),
(9, 4, 7),
(10, 4, 8),
(11, 5, 1),
(12, 5, 6),
(13, 6, 2),
(14, 6, 5),
(15, 6, 9),
(16, 7, 3),
(17, 7, 7),
(18, 8, 4),
(19, 8, 8),
(20, 9, 1),
(21, 9, 10),
(22, 10, 2),
(23, 10, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `user_age` int(2) NOT NULL,
  `user_name` varchar(10) NOT NULL,
  `user_lastname` varchar(10) NOT NULL,
  `user_email` varchar(100) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `id_role` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`user_id`, `user_age`, `user_name`, `user_lastname`, `user_email`, `user_password`, `id_role`) VALUES
(1, 25, 'Juan', 'Pérez', 'juan.perez@example.com', '1234', 1),
(2, 30, 'María', 'Gómez', 'maria.gomez@example.com', '1234', 2),
(3, 22, 'Carlos', 'López', 'carlos.lopez@example.com', '1234', 2),
(4, 28, 'Ana', 'Martínez', 'ana.martinez@example.com', '1234', 2),
(5, 35, 'Pedro', 'Sánchez', 'pedro.sanchez@example.com', '1234', 2),
(6, 19, 'Laura', 'Fernández', 'laura.fernandez@example.com', '1234', 2),
(7, 40, 'Roberto', 'Díaz', 'roberto.diaz@example.com', '1234', 2),
(8, 27, 'Sofía', 'Ruiz', 'sofia.ruiz@example.com', '1234', 2),
(9, 33, 'Javier', 'Hernández', 'javier.hernandez@example.com', '1234', 2),
(10, 24, 'Lucía', 'Jiménez', 'lucia.jimenez@example.com', '1234', 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `id_user` (`id_user`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`role_id`);

--
-- Indices de la tabla `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`tag_id`);

--
-- Indices de la tabla `userpreferences`
--
ALTER TABLE `userpreferences`
  ADD PRIMARY KEY (`userpreference_id`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_tag` (`id_tag`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `user_email` (`user_email`),
  ADD KEY `id_role` (`id_role`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `comments`
--
ALTER TABLE `comments`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=91;

--
-- AUTO_INCREMENT de la tabla `userpreferences`
--
ALTER TABLE `userpreferences`
  MODIFY `userpreference_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`user_id`);

--
-- Filtros para la tabla `userpreferences`
--
ALTER TABLE `userpreferences`
  ADD CONSTRAINT `userpreferences_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `userpreferences_ibfk_2` FOREIGN KEY (`id_tag`) REFERENCES `tags` (`tag_id`);

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`id_role`) REFERENCES `roles` (`role_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
