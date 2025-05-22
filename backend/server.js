const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const server = express();
server.use(cors());
server.use(express.json());

const database = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "metacritic",
});

// ✅ ENDPOINT: Obtener reseñas por usuario
server.get("/comment/user/:id", (req, res) => {
  const user_id = req.params.id;
  const sql = `
    SELECT comment_movieid, comment_moviename, comment_content, comment_rating 
    FROM comments 
    WHERE id_user = ?
  `;
  database.query(sql, [user_id], (err, data) => {
    if (err) return res.status(500).json({ error: "Error al obtener comentarios" });
    res.json(data);
  });
});

// ✅ ENDPOINT: Obtener reseñas por película
server.get("/comment/movie/:id", (req, res) => {
  const movie_id = req.params.id;
  const sql = `
    SELECT comment_content, comment_rating, comment_movieid, comment_moviename,
           user_id, user_name, user_lastname
    FROM comments 
    JOIN users ON id_user = users.user_id 
    WHERE comment_movieid = ?
  `;
  database.query(sql, [movie_id], (err, data) => {
    if (err) return res.status(500).json({ error: "Error al obtener comentarios de película" });
    res.json(data);
  });
});

// ✅ ENDPOINT: Agregar una reseña
server.post("/api/review", (req, res) => {
  const { comment, rating, movieId, movieName, userId } = req.body;

  if (!comment || !rating || !movieId || !movieName || !userId) {
    return res.status(400).json({ error: "Datos incompletos para la reseña." });
  }

  const sql = `
    INSERT INTO comments (comment_rating, comment_content, comment_movieid, comment_moviename, id_user)
    VALUES (?, ?, ?, ?, ?)
  `;

  database.query(sql, [rating, comment, movieId, movieName, userId], (err) => {
    if (err) return res.status(500).json({ error: "No se pudo guardar la reseña." });
    res.status(200).json({ message: "Comentario guardado correctamente." });
  });
});

server.listen(8081, () => {
  console.log("Servidor corriendo en http://localhost:8081");
});
