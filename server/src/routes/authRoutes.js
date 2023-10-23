const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

router.post('/registrar', authController.register);
router.post('/login', authController.login);
router.post('/crear', authController.createPublicacion);
router.get('/publicaciones', authController.obtenerPublicaciones);
router.post('/likes', async (req, res) => {
    const { userId, publicationId } = req.body;
  
    // Verificar si el usuario está autenticado
    if (!userId) {
      return res.status(401).send('No autorizado. Debes iniciar sesión para dar like.');
    }
  
    try {
      // Comprueba si el usuario ya ha dado like a esta publicación
      const existingLike = await db.query('SELECT * FROM likes WHERE usuario_id = ? AND publicacion_id = ?', [userId, publicationId]);
  
      if (existingLike.length > 0) {
        // El usuario ya dio like, por lo que se quitará el like (eliminar el registro)
        await db.query('DELETE FROM likes WHERE usuario_id = ? AND publicacion_id = ?', [userId, publicationId]);
        res.status(200).send('Like retirado exitosamente.');
      } else {
        // El usuario no ha dado like, por lo que se agrega el like (insertar el registro)
        await db.query('INSERT INTO likes (usuario_id, publicacion_id) VALUES (?, ?)', [userId, publicationId]);
        res.status(200).send('Like agregado exitosamente.');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor.');
    }
  });
  

module.exports = router;
