const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");


app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"usuariosfeed"
});

app.post("/registrar",(req,res)=> {
    const nombres = req.body.nombres;
    const apellidos = req.body.apellidos;
    const email = req.body.email;
    const usuario = req.body.usuario;
    const password = req.body.password;

    db.query('INSERT INTO usuarios(nombres,apellidos,email,usuario,password) VALUES(?,?,?,?,?)',[nombres,apellidos,email,usuario,password],
    (err,result)=>{
        if(err){
            console.log(err);
            console.log(result)
        }else{
            res.send("usuario registrado con exito!!");
            console.log(result)
        }
    }
    );
});

app.get('/usuarios', (req, res) => {
    // Consulta SQL para obtener todos los empleados
    const sql = 'SELECT * FROM usuarios';
  
    // Ejecutar la consulta
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Error al obtener usuarios: ' + err.message);
        res.status(500).send('Error al obtener usuarios');
      } else {
        console.log('usuarios obtenidos con éxito');
        res.status(200).json(results);
      }
    });
  });
  
app.listen(3001,()=>{
    console.log("corriendo en el puerto:", 3001)
})