require('dotenv').config();

const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});


app.post("/registrar", async (req, res) => {
  const nombres = req.body.nombres;
  const apellidos = req.body.apellidos;
  const email = req.body.email;
  const usuario = req.body.usuario;
  const password = req.body.password;

  // Hash de la contraseña antes de almacenarla
  const hashedPassword = await bcrypt.hash(password, 10);

  db.query('INSERT INTO usuarios(nombres, apellidos, email, usuario, password) VALUES(?,?,?,?,?)',
      [nombres, apellidos, email, usuario, hashedPassword],
      (err, result) => {
          if (err) {
              console.log(err);
              console.log(result);
              res.status(500).send("Error interno del servidor");
          } else {
              res.send("Usuario registrado con éxito!!");
              console.log(result);
          }
      }
  );
});
// Endpoint para la autenticación
app.post("/login", async (req, res) => {
  const usuario = req.body.usuario;
  const password = req.body.password;

  // Buscar el usuario en la base de datos
  db.query('SELECT * FROM usuarios WHERE usuario = ?',
    [usuario],
    async (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error interno del servidor");
      } else if (results.length > 0) {
        // Verificar la contraseña
        const match = await bcrypt.compare(password, results[0].password);

        if (match) {
          // Contraseña válida, generar token JWT
          const token = jwt.sign({ usuario: results[0].usuario }, 'claveSecreta', { expiresIn: '1h' });

          // Puedes enviar el token como respuesta
          res.json({ token });
        } else {
          res.status(401).send("Contraseña incorrecta");
        }
      } else {
        res.status(404).send("Usuario no encontrado");
      }
    }
  );
});
// app.get('/usuarios', (req, res) => {
//     // Consulta SQL para obtener todos los empleados
//     const sql = 'SELECT * FROM usuarios';
  
//     // Ejecutar la consulta
//     db.query(sql, (err, results) => {
//       if (err) {
//         console.error('Error al obtener usuarios: ' + err.message);
//         res.status(500).send('Error al obtener usuarios');
//       } else {
//         console.log('usuarios obtenidos con éxito');
//         res.status(200).json(results);
//       }
//     });
//   });

  process.on('beforeExit', () => {
    // Cerrar la conexión a la base de datos
    db.end();
});
  
app.listen(3001,()=>{
    console.log("corriendo en el puerto:", 3001)
})