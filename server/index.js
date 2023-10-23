const app = require('./app');

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`El servidor está corriendo en el puerto: ${PORT}`);
});