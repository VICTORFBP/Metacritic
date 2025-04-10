-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-04-2025 a las 05:45:02
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
  `id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `comments`
--

INSERT INTO `comments` (`comment_id`, `comment_rating`, `comment_content`, `comment_movieid`, `id_user`) VALUES
(1, 1, 'Esta adaptación es un insulto al clásico animado. ¿Dónde quedó la magia de Disney? Parece una parodia', 447273, 2),
(2, 1, 'La peor adaptación live action que ha hecho Disney. Blancanieves parece una influencer de TikTok, no', 447273, 3),
(3, 1, 'Horrible casting. La actriz de Blancanieves no tiene ni la inocencia ni el carisma del personaje ori', 447273, 4),
(4, 1, 'Destrozaron completamente la historia. Los cambios no añaden nada, solo arruinan lo que hacía especi', 447273, 5),
(5, 1, 'Los enanitos son ridículos. Parecen extras de una película clase B. Vergonzoso.', 447273, 6),
(6, 1, 'La Reina Malvada es el único personaje decente, pero ni siquiera ella salva este desastre cinematogr', 447273, 7),
(7, 1, 'Disney debería dejar de hacer estos remakes. Solo demuestran su falta total de ideas originales.', 447273, 8),
(8, 1, 'Ni mis hijos de 5 años quisieron verla completa. Aburrida, predecible y mal actuada.', 447273, 9),
(9, 1, 'Los efectos especiales parecen de los 90. ¿En qué gastaron el presupuesto?', 447273, 10),
(10, 1, 'La banda sonora es un crimen contra las canciones originales. Autotune por todos lados.', 447273, 1),
(11, 1, 'Blancanieves pasa de ser un personaje icónico a una protagonista plana sin personalidad.', 447273, 2),
(12, 1, 'La escena del beso es tan forzada que da vergüenza ajena. Cero química entre los actores.', 447273, 3),
(13, 1, 'El guión parece escrito por un algoritmo. Diálogos antinaturales y situaciones absurdas.', 447273, 4),
(14, 1, '2 horas de mi vida que nunca recuperaré. Hasta el original de 1937 tiene mejor animación que estos e', 447273, 5),
(15, 1, 'El único mérito de esta película es que me hizo apreciar más la versión animada. Pésima en todos los', 447273, 6),
(16, 1, 'Esta adaptación es un insulto al clásico animado. ¿Dónde quedó la magia de Disney? Parece una parodia barata.', 447273, 2),
(17, 1, 'La peor adaptación live action que ha hecho Disney. Blancanieves parece una influencer de TikTok, no una princesa de cuento.', 447273, 3),
(18, 1, 'Horrible casting. La actriz de Blancanieves no tiene ni la inocencia ni el carisma del personaje original.', 447273, 4),
(19, 1, 'Destrozaron completamente la historia. Los cambios no añaden nada, solo arruinan lo que hacía especial al original.', 447273, 5),
(20, 1, 'Los enanitos son ridículos. Parecen extras de una película clase B. Vergonzoso.', 447273, 6),
(21, 1, 'La Reina Malvada es el único personaje decente, pero ni siquiera ella salva este desastre cinematográfico.', 447273, 7),
(22, 1, 'Disney debería dejar de hacer estos remakes. Solo demuestran su falta total de ideas originales.', 447273, 8),
(23, 1, 'Ni mis hijos de 5 años quisieron verla completa. Aburrida, predecible y mal actuada.', 447273, 9),
(24, 1, 'Los efectos especiales parecen de los 90. ¿En qué gastaron el presupuesto?', 447273, 10),
(25, 1, 'La banda sonora es un crimen contra las canciones originales. Autotune por todos lados.', 447273, 1),
(26, 1, 'Blancanieves pasa de ser un personaje icónico a una protagonista plana sin personalidad.', 447273, 2),
(27, 1, 'La escena del beso es tan forzada que da vergüenza ajena. Cero química entre los actores.', 447273, 3),
(28, 1, 'El guión parece escrito por un algoritmo. Diálogos antinaturales y situaciones absurdas.', 447273, 4),
(29, 1, '2 horas de mi vida que nunca recuperaré. Hasta el original de 1937 tiene mejor animación que estos efectos.', 447273, 5),
(30, 1, 'El único mérito de esta película es que me hizo apreciar más la versión animada. Pésima en todos los aspectos.', 447273, 6),
(31, 1, 'Esta adaptación es un insulto al clásico animado. ¿Dónde quedó la magia de Disney? Parece una parodi', 447273, 2),
(32, 1, 'Esta adaptación es un insulto al clásico animado. ¿Dónde quedó la magia de Disney? Parece una parodi', 447273, 2),
(33, 4, 'La película logra combinar un guión inteligente con secuencias de acción innovadoras. Destaco especialmente la química entre los protagonistas en las escenas dramáticas, aunque hubiera preferido más desarrollo para el villano secundario. La escena del tren en el tercer acto es simplemente cinematográfica.', 950387, 3),
(34, 5, 'Una obra maestra del cine moderno. Desde la fotografía que juega con los contrastes de color hasta la dirección de arte meticulosa, cada detalle suma. El monólogo del personaje principal en la lluvia quedará grabado en mi memoria por años. ¡Bravo por el equipo de efectos prácticos que le dieron ese realismo crudo!', 950387, 7),
(35, 3, 'Aunque la premisa inicial prometía originalidad, termina cayendo en clichés del género. Los primeros 40 minutos son intrigantes, pero luego la trama se vuelve predecible. Puntos positivos para el diseño de vestuario y la interpretación de la actriz secundaria, que robó cada escena donde aparecía.', 950387, 2),
(36, 5, 'Este film redefine lo que esperamos del cine de ciencia ficción. La construcción del mundo futurista es coherente y minuciosa, con tecnología que parece plausible. La subtrama sobre la ética de la inteligencia artificial especialmente me hizo reflexionar días después de verla. ¡Oscar merecido para el director de fotografía!', 950387, 9),
(37, 2, 'Una decepción considerando el talento del elenco. Los diálogos suenan artificiales y hay escenas clave donde la edición abrupta rompe la inmersión. La secuencia del laboratorio (que duró 15 minutos) pudo haberse resuelto en 5 sin perder impacto. Potencial desperdiciado.', 950387, 5),
(38, 4, 'Merece múltiples visionados para captar todos los detalles. El uso de simbolismos visuales (como el reloj roto recurrente) añade profundidad filosófica. Sin embargo, el ritmo irregular en el segundo acto podría desanimar a espectadores casuales. La banda sonora electrónica de los años 80 fue una elección arriesgada pero efectiva.', 950387, 1),
(39, 5, 'Una experiencia sensorial completa. Combinó lo mejor del thriller psicológico con momentos de puro terror existencial. Los planos secuencia en los pasillos oscuros generan una tensión insoportablemente buena. Mención aparte para el diseño de sonido: los efectos direccionales en el cine hacían que literalmente sintieras los susurros detrás de ti.', 950387, 10),
(40, 3, 'Interesante concepto que no llega a su máximo potencial. Mientras la primera mitad construye una mitología fascinante, el desenlace se siente apresurado y con demasiadas preguntas sin responder. Los efectos CGI en las criaturas son inconsistentes: algunas se ven hiperrealistas mientras otras parecen sacadas de un videojuego viejo.', 950387, 4),
(41, 4, 'Un viaje visual que desafía las convenciones narrativas. El uso de perspectiva forzada y escenografías prácticas crea un universo onírico único. Aunque algunos giros argumentales requieren demasiada suspensión de la incredulidad, la actuación comprometida del elenco principal mantiene la verosimilitud. El cameo del director en la escena del bar es un guiño divertido para los cinéfilos.', 950387, 8),
(42, 1, 'Difícil encontrar aspectos positivos. La edición salta entre tres líneas temporales sin ton ni son, confundiendo más que intrigando. Los personajes toman decisiones ilógicas constantemente solo para avanzar la trama. Hasta la mezcla de audio falla, con diálogos ahogados por la música ambiental en momentos cruciales. Una pena, porque la premisa del tráiler parecía prometedora.', 950387, 6);

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
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

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
