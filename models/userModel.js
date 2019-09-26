'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const Roles = {
    values: ['Admin', 'User'],
    message: '{VALUE} role no permitido.'
}

const userSchema = Schema ({
    name: {
        type: String,
        required: [true, 'Es necesario el nombre.']
    },
    nick: {
        type: String,
        unique: true,
        required: [true, 'Es necesario el nick.']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Es necesaria el email.']
    },
    pass: {
        type: String,
        required: [true, 'Es necesario el password.']
    },
    role: {
        type: String,
        default: 'User',
        required: [true, 'Role es necesario'],
        enum: Roles
    }
});

userSchema.plugin( uniqueValidator, {message:'{PATH} debe ser unico.'});

module.exports = mongoose.model('User', userSchema);