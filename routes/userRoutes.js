
const express = require('express');
const appUser = express();
const auth = require('../middleware/jwtMiddleware');

const userController = require('../Controllers/userController');


appUser.post('/login', userController.login);

//Rutas protegidas
appUser.use(auth.protegerRutas);
appUser.get('/listar', userController.listar);
appUser.post('/crear', userController.crear);
appUser.put('/modificar', userController.modificar);
appUser.delete('/borrar', userController.borrar);
appUser.put('/updatePass', userController.updatePass);

module.exports = appUser;