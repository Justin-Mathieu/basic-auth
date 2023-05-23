const express = require('express');
const router = express.Router();
const { Users } = require('./models/index')
const bcrypt = require('bcrypt')


async function signup(req, res) {

    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const record = await Users.create(req.body);
        res.status(200).json(record);
    } catch (e) { res.status(403).send('Error Creating User'); }
};

async function signin(req, res) {

    let basicHeaderParts = req.headers.authorization.split(' ');
    let encodedString = basicHeaderParts.pop();
    let decodedString = base64.decode(encodedString);
    let [username, password] = decodedString.split(':');

    try {
        const user = await Users.findOne({ where: { username: username } });
        const valid = await bcrypt.compare(password, user.password);
        if (valid) {
            res.status(200).json(user);
        }
        else {
            throw new Error('Invalid User');
        }
    } catch (error) { res.status(403).send('Invalid Login'); }

};


router.post('/signin', signin);
router.post('/signup', signup);


module.exports = router;