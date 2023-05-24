'use strict';

require('dotenv').config();
const { sequelize } = require('./src/auth/models');
const { start } = require('./src/server');
const PORT = process.env.PORT || 3001

sequelize.sync()
    .then(() => {
        console.log('Successful database Connection');
        start(PORT);
    })
    .catch(error => {
        console.error('Server Not Started ERROR: ', error.message)
    });