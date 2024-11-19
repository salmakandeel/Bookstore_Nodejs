const {user}=require("../models/user")
const jwt = require('jsonwebtoken');

const authenticateJWT = async (req, res, next) => {
    try {
        const { token } = req.headers;

        const decoded =await  jwt.verify(token, '3000');
        next();
    }
    catch (e) {
        res.status(401).send({  Message: 'Authentication is invalid.' })
    }
};



module.exports = { authenticateJWT };