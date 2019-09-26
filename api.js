

const express = require('express');

const apiUser = express();
const userRoutes = require('./routes/userRoutes');
const moviesRoutes = require('./routes/movieRoutes');

apiUser.use('/user', userRoutes);
apiUser.use('/movies', moviesRoutes);

module.exports = apiUser;