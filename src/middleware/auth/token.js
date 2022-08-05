const SECRET = process.env.SECRET;
const NEWSECRET = process.env.NEWSECRET;

const express = require('express');
const jwt = require('jsonwebtoken');
const user = require('../../models/user/model');
const router = express.Router();



function refreshToken(req, res) {
  console.log('this is working');
  let tokenArray = [];
  console.log('what iam trying to access: ' + req.body.username);
  const user = { username: req.body.username };
  const token = jwt.sign(user, SECRET, { expiresIn: '15m' });
  console.log(user);

  console.log(token);
  let refreshToken = jwt.sign(user, NEWSECRET, { expiresIn: '15m' });
  tokenArray.push(refreshToken);

  // res.status(200).json(token, refreshToken);

  let newrefreshToken = req.headers['x-auth-token'];
  if (!refreshToken) {
    res.status(403).send('No new refresh token');
  }
  if (!tokenArray.includes(refreshToken)) {
    res.status(403).send('not in the array');
  }
  try {
    const user = jwt.verify(newrefreshToken, NEWSECRET);
    req.user = user;
    const token = jwt.sign(user, SECRET, { expiresIn: '10m' });
    res.send(token);

  } catch (error) {
    res.status(403).send('invalid token this didnt work');
  }
}

router.post('/login', refreshToken);


module.exports = router;