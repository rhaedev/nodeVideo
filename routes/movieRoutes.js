'use strict';

const express = require('express');
const appMovie = express();
//const auth = require('../middleware/jwtMiddleware');
const movieController = require('../Controllers/moviesController');

appMovie.get('/listar', movieController.listarPelicula);
appMovie.post('/crear', movieController.crearPelicula);
appMovie.delete('/borrar', movieController.borrarPelicula);
appMovie.put('/modificar', movieController.modificarPelicula);

module.exports = appMovie;