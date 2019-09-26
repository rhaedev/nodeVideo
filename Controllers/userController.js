'use strict';

const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwtToken = require('../helpers/jwtHelper');
const saltRounds = 10;

function listar(req, res) {
    User.find({}, (err, respUser) => {
        if (err) return res.status(400).json({ message: 'No se puede listar Usuarios.', 'error': err });
        if (respUser) return res.status(200).json({ 'message': 'LISTA DE USUARIOS', 'Usuarios': respUser });
    });
}


function crear(req, res) {
    const usuario = req.body.user;
    let newUser = new User(usuario);

    bcrypt.hash(newUser.pass, saltRounds, (err, hash) => {
        if (err) return res.status(400).json({ 'error': "No se pudo encriptar la Contraseña." });
        if (hash) {
            newUser.pass = hash;
            newUser.save().then((newUser) => {
                res.status(200).json({
                    message: 'Usuario creado.',
                    newUser
                });
            }).catch((err) => {
                res.status(404).json({
                    'err': err
                });
            });
        }
    });
}


function modificar(req, res) {
    let id = req.query.id;
    const usuario = req.body.user;

    const protectedUser = {
        name: usuario.name,
        email: usuario.email,
        role: usuario.role
    }
    if (id.length === 24) {
        User.updateOne({ _id: id }, { $set: protectedUser }, (err, userUpdated) => {
            if (err) return res.status(400).json({ 'error': "No se pudo modificar el Usuario." });
            if (userUpdated) return res.status(200).json({ 'message': 'Usuario Actualizado', userUpdated });
        });
    } else {
        return res.status(400).json({ message: 'Seleccione un Usuario para modificar.' })
    }
}

function updatePass(req, res) {
    let id = req.query.id;
    const password = req.body.user.password;

    if(id.length === 24) {
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) return res.status(400).json({ message: 'No se ha podido encriptar.' });
            if (hash) {
                User.updateOne({ _id: id }, { $set: { pass: hash } }, (err, userUpdated) => {
                    if (err) return res.status(400).json({ error: err });
                    if (userUpdated) return res.status(200).json({ message: 'Contraseña Actualizada', userUpdated });
                });
            }
        });
    } else {
        return res.status(400).json({message: 'Id de usuario no valida'});
    }
}


function borrar(req, res) {
    let id = req.query.id;

    if (id) {
        User.deleteOne({ _id: id }, (err, userDeleted) => {
            if (err) return res.status(400).json({ 'error': "El usuario que desea borrar no existe." });
            if (userDeleted) return res.status(200).json({ 'message': 'Usuario Deleteado', userDeleted });
        });
    } else {
        return res.status(400).json({ message: 'Seleccione un Usuario para borrar.' })
    }
}

function login(req, res) {
    let usuario = req.body.user;
    User.findOne({ email: usuario.email }, (err, usuarioLogueado) => {
        if (err) return res.status(400).json({ 'error': 'Usuario no encontrado.' });
        if (usuarioLogueado) {
            bcrypt.compare(usuario.pass, usuarioLogueado.pass, (error, response) => {
                if (error) return res.status(400).json({ 'error': 'Contraseña erronea.', 'error': error });
                if (response) {
                    let token = jwtToken.encode(usuarioLogueado);
                    return res.status(200).json({ message: 'Usuario Logueado', token: token });
                } else {
                    return res.status(400).json({ 'error': 'Usuario y Contraseña no coinciden.' })
                }
            });
        } else {
            return res.status(400).json({ 'Error': 'Usuario no existe.'});
        }
    });
}

module.exports = {
    listar,
    crear,
    modificar,
    borrar,
    login,
    updatePass
};