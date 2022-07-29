'use strict';

const express = require('express');
const router = express.Router();
const { userAuth } = require('../../auth/basic');
const { signUp } = require('../../auth/basic');
// const usersCollection = require('../models/index');

router.post('/signin', userAuth);

router.post('/signup', signUp);  