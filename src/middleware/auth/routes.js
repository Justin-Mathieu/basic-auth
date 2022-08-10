'use strict';
const express = require('express');
const router = express.Router();
const { User } = require('../../models/index');
const bcrypt = require('bcrypt');


async function signUp(req, res) {
  try {
    let body = req.body;
    let createdUser = await User.create(body);
    res.status(200).send(createdUser);

  }
  catch (error) {
    res.status(500).send(`Unable to create User` + error);
  }
}


async function signIn(req, res) {
  try {
    const user = await User.model.findOne({ where: { username: req.body.username } });
    const check = await bcrypt.compare(req.body.password, user.password);

    if (check) {

      res.status(200).send({ username: user.username, token: user.token, role: 'admin' });
    }
  }
  catch (error) {
    res.status(403).send('Invalid login ' + error);
  }


}


router.post('/signup', signUp);
router.post('/signin', signIn);

module.exports = router;