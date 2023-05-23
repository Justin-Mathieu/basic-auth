
const express = require('express')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authRoutes = require('./auth/router');

app.use(authRoutes);


const start = (port) => {
    app.listen(port, () => console.log(`server listening on:${port}`));
};

module.exports = { app, start };