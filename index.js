require('dotenv').config();
const { sequelize } = require('./src/auth/models/index');
const { start } = require('./src/server');
const port = process.env.PORT;

sequelize.sync()

    .then(() => {

        console.log('Successful database Connection');
        start(port);
    })
    .catch(error => console.error(error));