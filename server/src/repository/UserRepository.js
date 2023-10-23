const db = require('../utils/database');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { Sequelize, DataTypes } = require('sequelize');


const userRepository = {
  createUser: (userData, callback) => {
    db.query(`INSERT INTO ${userModel} (nombres, apellidos, email, usuario, password) VALUES (?,?,?,?,?)`,
      [...Object.values(userData)],
      callback
    );
  },
  getUserByUsername: (username, callback) => {
    db.query(`SELECT * FROM ${userModel} WHERE usuario = ?`,
      [username],
      callback
    );
  },
  verifyToken: (req, res, next) => {
    const token = req.headers('Authorization');
  
    if (!token) {
      console.log('Token no proporcionado');
      return res.status(401).json({ message: 'Token no proporcionado' });
    }
  
    try {
      const decoded = jwt.verify(token, 'claveSecreta');
      req.user = decoded;
      next();
    } catch (error) {
      console.log('Token no válido:', error.message);
      return res.status(401).json({ message: 'Token no válido' });
    }
  },

  
  createPublicacion: (publicacionData, callback) => {
    db.query('INSERT INTO publicaciones SET ?', publicacionData, callback);
  },
  

  obtenerPublicaciones: (callback) => {
    const query = `
      SELECT p._id, u.usuario, p.contenido, p.imagen, p.fecha_publicacion
      FROM publicaciones p
      JOIN usuarios u ON p.usuario_id = u.id
      ORDER BY p.fecha_publicacion DESC
    `;
  
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error al obtener publicaciones: ' + err.message);
        callback(err, null);
      } else {
        callback(null, results);
      }
    });
  },


};


module.exports = userRepository;
