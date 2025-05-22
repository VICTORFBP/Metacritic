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

// ✅ REGISTRO
server.post("/api/register", (req, res) => {
  const { name, lastname, age, email, password } = req.body;

  if (!name || !lastname || !age || !email || !password) {
    return res.status(400).json({ error: "Todos los campos son obligatorios." });
  }

  const checkEmail = "SELECT * FROM users WHERE user_email = ?";
  database.query(checkEmail, [email], (err, result) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos." });

    if (result.length > 0) {
      return res.status(400).json({ error: "El correo ya está registrado." });
    }

    const defaultRole = 2;

    const insertQuery = `
      INSERT INTO users (user_name, user_lastname, user_age, user_email, user_password, id_role)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    database.query(
      insertQuery,
      [name, lastname, age, email, password, defaultRole],
      (err, result) => {
        if (err) {
          console.error("Error al registrar:", err);
          return res.status(500).json({ error: "Error al registrar el usuario." });
        }

        return res.status(200).json({ message: "Usuario registrado correctamente." });
      }
    );
  });
});

// ✅ LOGIN
server.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Correo y contraseña requeridos." });
  }

  const loginQuery = "SELECT * FROM users WHERE user_email = ? AND user_password = ?";
  database.query(loginQuery, [email, password], (err, result) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos." });

    if (result.length === 0) {
      return res.status(401).json({ error: "Credenciales inválidas." });
    }

    const user = result[0];
    res.status(200).json({
      user_id: user.user_id,
      username: user.user_name,
      email: user.user_email,
      role: user.id_role,
    });
  });
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

// ✅ ENDPOINT: Editar reseña
server.put("/api/review/:commentId", (req, res) => {
  const commentId = req.params.commentId;
  const { comment, rating, userId } = req.body;

  if (!comment || !rating || !userId) {
    return res.status(400).json({ error: "Datos incompletos para la reseña." });
  }

  // Verificar que el usuario sea el dueño del comentario (opcional pero recomendable)
  const checkOwnerSql = "SELECT id_user FROM comments WHERE comment_id = ?";
  database.query(checkOwnerSql, [commentId], (err, results) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos." });
    if (results.length === 0) return res.status(404).json({ error: "Comentario no encontrado." });

    // Corregimos la comparación para que no falle por diferencia de tipos
    if (results[0].id_user !== Number(userId)) return res.status(403).json({ error: "No autorizado." });

    // Actualizar reseña
    const updateSql = `
      UPDATE comments SET comment_content = ?, comment_rating = ?
      WHERE comment_id = ?
    `;
    database.query(updateSql, [comment, rating, commentId], (err) => {
      if (err) {
        console.error("Error al actualizar reseña:", err);
        return res.status(500).json({ error: "Error al actualizar la reseña." });
      }
      res.status(200).json({ message: "Reseña actualizada correctamente." });
    });
  });
});

server.listen(8081, () => {
  console.log("Servidor corriendo en http://localhost:8081");
});
