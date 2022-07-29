'use strict';

const user = require('../src/models/index').users;
const bcrypt = require('bcrypt');
const { Collection } = require('../src/models/data-collection');



// Creating user 
async function signUp(req, res) {
  console.log(req);

  try {

    const addSalt = bcrypt.genSalt();
    const hashed = await bcrypt.hash(req.body.password, addSalt);
    const user = { username: req.body.userName, password: hashed };

    res.status(201).send(user);
    Collection.create(user);
  }
  catch {
    res.status(500).send('Could not create user');
  }

}



// Autheniticating user

async function userAuth(req, res, next) {
  const theUser = user.find(user => req.body.userName === user.userName);
  if (theUser === null) {
    res.status(500).send(' invalid username or password');
  }
  try {
    if (await bcrypt.compare(req.body.password, theUser.password)) {
      res.status(200).send('You are logged in!');
    }
    else {
      res.status(500).send(' invalid username or password');
      // next(error);
    }

  }
  catch {
    res.status(500).send();
  }

}


module.exports = { userAuth, signUp };
