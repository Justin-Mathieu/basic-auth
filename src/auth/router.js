const express = require('express');
const router = express.Router();
const { Users } = require('./models')
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const basicAuth = require('./middleware/basic');

router.post('/signup', async (req, res, next) => {

    try {

        req.body.password = await bcrypt.hash(req.body.password, 10);
        const record = await Users.create(req.body);
        res.status(200).json(record);
    } catch (e) { res.status(403).send('Error Creating User'); }
});




router.post('/signin', basicAuth, async (req, res, next) => {
    try {
        res.status(200).json(req.user);
    }
    catch (error) { next('Invalid Login ERROR: ', error.message) }
});



module.exports = router;