const express = require('express');
const app = express();

const tareasRoutes = require('./routes/tareasRoutes');
const usuariosRoutes = require('./routes/usuariosRoutes');

app.use(express.json());
app.use('/tareas', tareasRoutes);
app.use('/usuarios', usuariosRoutes);

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});