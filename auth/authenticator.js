const jwt = require('jsonwebtoken');
const secrets = require('./secrets');

module.exports = (req, res, next) => {
    const secret = secrets.jwtSecret;
    const token = req.headers.authorization;

    if(token){
        // verify that the token is valid
        jwt.verify(token, secret, (error, decodedToken) => {
            // if everything looks good, the error will be undefined
            if(error) {
                res.status(401).json({ message: "access denied" })
            } else {
                // make the decoded token available on the req object
                req.decodedToken = decodedToken;

                next();
            }
        })
    } else {
        // if no token
        res.status(401).json({ message: "please provide valid credentials" })
    }
}