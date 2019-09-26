'use strict';

const Movie = require('../models/moviesModel');


function listarPelicula (req, res){
    Movie.find({}).populate('user').exec((err, movies) => {
        if (err) return res.status(400).json({'error': err});
        if (movies) {
            return res.status(200).json({'message': 'PELICULAS', 'movies': movies});
        } else {
            return res.status(400).json({'error': 'No hay peliculas que mostrar.'});
        }
    });
}

function crearPelicula (req, res){
    if (!req.body.movie){
        return res.status(400).json({'error': 'Faltan parametros'});
    } else {
        let movie = req.body.movie;
        let newMovie = new Movie(movie);

        newMovie.save().then(movieCreated => {
            return res.status(200).json({'message': 'Pelicula creada correctamente', movieCreated});
        }).catch(err => {
            return res.status(400).json({'error': 'No se puede crear pelicula',err});
        });
    }
}

function modificarPelicula(req, res){
    let id = req.query.id;
    let movie = req.body.movie;

    if (id) {
        Movie.updateOne({_id: id}, {$set: movie}).then(movieUpdated => {
            return res.status(200).json({'message':'Pelicula Actualizada', movieUpdated})
        }).catch(err => {
            return res.status(400).json({'message':'No se ha actualizado la pelicula', err});
        });
    } else {
        return res.status(400).json({'Advertencia': 'Complete los campos para crear una Pelicula.'})
    }
}

function borrarPelicula(req, res){
    let id = req.query.id;

    if (id) {
        Movie.deleteOne({ _id: id }).then( movieDeleted => {
            return res.status(200).json({ 'message': 'Pelicula borrada.', movieDeleted });
        }).catch(err => {
            return res.status(400).json({ 'error': 'La pelicula no pudo ser borrada', err });
        });
    } else {
        return res.status(400).json({ message: 'Seleccione una Pelicula para borrar.' })
    }
}

module.exports = {
    listarPelicula,
    crearPelicula,
    modificarPelicula,
    borrarPelicula
}