'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const movieSchema = Schema ({
    titulo: {
        type: String,
        required: [true, 'Es necesario el nombre.']
    },
    descripcion: {
        type: String,
        required: [true, 'Es necesario el nick.']
    },
    imagen: String,
    user: {
        type: Schema.ObjectId, 
        ref: 'User'
    }
});

module.exports = mongoose.model('Movie', movieSchema);