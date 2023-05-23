




function validate(req, res, next) {
    const token = req.headers['authorization'];

    if (token) {
        const user = jwt.verify(token, SECRET);
        req.user = user;
        next();

    }
    else {
        res.status(403).send('Not Authorized');


    }
}






module.exports = validate;