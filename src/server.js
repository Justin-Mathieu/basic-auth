'use strict';

const express = require('express')
const authRoutes = require('./auth/router');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authRoutes);

const start = (port) => {
    app.listen(port, () => console.log(`server listening on:${port}`));
};

module.exports = { app, start };