const express = require("express")
const mysql = require("mysql")
const cors = require("cors")

const server = express()
server.use(cors())

const database = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "metacritic",
})

server.get("/comment/user/:id", (req, res) => {
  const user_id = req.params.id;
  const sql = `SELECT comment_movieid, comment_content, comment_rating FROM comments WHERE id_user=${user_id}`;

  database.query(sql, (err, data) => {
    return res.json(err ? err : data)
  })
})

server.get("/comment/movie/:id", (req, res) => {
  const movie_id = req.params.id;

  const sql = `
    SELECT 
      comment_content, comment_rating, 
      user_name, user_lastname
    FROM comments 
    JOIN users ON id_user = users.user_id 
    WHERE comment_movieid=${movie_id}
  `;

  database.query(sql, (err, data) => {
    return res.json(err ? err : data)
  })
})

server.get("/comments/", (req, res) => {
  const user_id = req.params.user_id;

  const sql = "SELECT comment_movieid, comment_content, comment_rating FROM comments";

  database.query(sql, (err, data) => {
    return res.json(err ? err : data)
  })
})

server.get("/user/:user_email/:user_password", (req, res) => {
  const user_email = req.params.user_email;
  const user_password = req.params.user_password;

  const sql = `SELECT user_id, user_name, user_age, user_lastname FROM users WHERE user_email='${user_email}' and user_password='${user_password}'`;

  database.query(sql, (err, data) => {
    return res.json(err ? err : data)
  })
})

server.listen(8081, () => { console.log("Escuchando...") })