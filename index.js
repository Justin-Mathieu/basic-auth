'use strict';

require('dotenv').config();
const server = require('./src/server.js');
const { db } = require('./src/models/index.js');

db.sync()
  .then(() => {
    server.start(3002);
  })
  .catch(console.error);