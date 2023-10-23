const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRepository = require('../repository/UserRepository');

const authController = {
  register: async (req, res) => {
    const { nombres, apellidos, email, usuario, password } = req.body;

    // Verificar si el usuario ya existe
    userRepository.getUserByUsername(usuario, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error interno del servidor');
      }

      if (results.length > 0) {
        return res.status(409).send('El usuario ya existe');
      }

      // Hash de la contraseña antes de almacenarla
      bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
        if (hashErr) {
          console.error(hashErr);
          return res.status(500).send('Error interno del servidor');
        }

        // Crear nuevo usuario
        const userData = { nombres, apellidos, email, usuario, password: hashedPassword };
        userRepository.createUser(userData, (createErr, result) => {
          if (createErr) {
            console.error(createErr);
            return res.status(500).send('Error interno del servidor');
          }

          res.status(201).send('Usuario registrado con éxito');
        });
      });
    });
  },

  login: async (req, res) => {
    const { usuario, password } = req.body;

    // Buscar el usuario en la base de datos
    userRepository.getUserByUsername(usuario, async (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error interno del servidor');
      }

      if (results.length > 0) {
        // Verificar la contraseña
        const match = await bcrypt.compare(password, results[0].password);

        if (match) {
          // Contraseña válida, generar un token JWT
          const token = jwt.sign({ usuario: results[0].usuario }, 'claveSecreta', { expiresIn: '1h' });

          // Enviar el token como respuesta
          res.json({ token });
        } else {
          res.status(401).send('Contraseña incorrecta');
        }
      } else {
        res.status(404).send('Usuario no encontrado');
      }
    });
  },
  

  createPublicacion: [userRepository.verifyToken, async (req, res) => {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Usuario no autenticado' });
    }
  
    const usuario_id = req.user.id;
    console.log('Usuario ID:', usuario_id);
  
    const publicacionData = {
      usuario_id,
      contenido,
      imagen,
    };
  
    userRepository.createPublicacion(publicacionData, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error interno del servidor');
      } else {
        res.status(201).send('Publicación creada correctamente');
      }
    });
  }],

  obtenerPublicaciones: (req, res) => {
    userRepository.obtenerPublicaciones((err, publicaciones) => {
      if (err) {
        res.status(500).json({ error: 'Error al obtener publicaciones' });
      } else {
        res.status(200).json(publicaciones);
      }
    });
  },
 
  
  

  // createPublicacion: async (req, res) => {
  //   const { contenido, imagen } = req.body;
  //   const usuario_id = req.user.id; // Supongamos que el usuario está autenticado y su información está en req.user

  //   const publicacionData = {
  //     usuario_id,
  //     contenido,
  //     imagen,
  //   };

  //   publicacionModel.createPublicacion(publicacionData, (err, result) => {
  //     if (err) {
  //       console.error(err);
  //       res.status(500).send('Error interno del servidor');
  //     } else {
  //       res.status(201).send('Publicación creada correctamente');
  //     }
  //   });
  // },
};

module.exports = authController;

