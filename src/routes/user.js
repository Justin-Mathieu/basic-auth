'use strict';
const express = require('express');
const User = require('../models/index.js').user;
const router = express.Router();

router.post('/users', createUser);
router.get('/users/:id', readUser);


async function readUser(req, res) {
  let id = req.params.id;
  let selectedUser = await User.read(id);
  res.status(200).json(selectedUser);
}

async function createUser(req, res) {
  let body = req.body;
  let createdUser = await User.create(body);
  console.log(createdUser);
  res.status(200).json(createdUser);
}

module.exports = router;