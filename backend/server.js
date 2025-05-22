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

database.connect((err) => {
  if (err) {
    console.error("Error al conectar a la base de datos:", err);
  } else {
    console.log("Conexión exitosa a MySQL");
  }
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

server.listen(8081, () => {
  console.log("Servidor corriendo en http://localhost:8081");
});
