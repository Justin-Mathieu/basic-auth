'use strict';
const SECRET = process.env.NEWSECRET;
const jwt = require('jsonwebtoken');


const session = (sequelize, Datatypes) => {
  const SessionModel = sequelize.define('Session', {
    username: {
      type: Datatypes.STRING,
    },
    session_id: {
      type: Datatypes.STRING,
      get() {
        const payload = { username: this.username };
        return jwt.sign(payload, SECRET);
      },
    },

  });
  return SessionModel;

};

module.exports = session;