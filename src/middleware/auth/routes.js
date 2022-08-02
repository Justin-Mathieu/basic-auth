'use strict';
const express = require('express');
const router = express.Router();
const { User } = require('../../models/index');
const bcrypt = require('bcrypt');

async function signUp(req, res) {
  try {
    let body = req.body;
    let createdUser = await User.create(body);

    res.status(200).json(createdUser);

  }
  catch (error) {
    res.status(500).send(`Unable to create User ${req.body.username}`);
  }
}


async function signIn(req, res) {
  try {
    const user = await User.model.findOne({ where: { username: req.body.username } });
    const check = await bcrypt.compare(req.body.password, user.password);

    if (check) {
      console.log(check);
      res.status(200).send(user);
    }
  }
  catch (error) {
    res.status(403).send('Invalid login');
  }


}


router.post('/signup', signUp);
router.post('/signin', signIn);

module.exports = router;