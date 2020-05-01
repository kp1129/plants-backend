const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('./secrets');
// data access layer
const Users = require('../users/usersModel');

const router = express.Router();

// register new user
router.post("/register", (req, res) => {
    let user = req.body;
    if(!user.username || !user.phoneNumber || !user.password || user.phoneNumber.length !== 10){
        res.status(400).json({ message: "Must provide username, password, and 10-digit phone number to register" })
    } else {
         // hash the password
        const rounds = process.env.HASH_ROUNDS || 12;
        // const rounds = 14;
        const hash = bcrypt.hashSync(user.password, rounds);
         // save hashed password
        user.password = hash;
        
        // add new user to the users table
        Users.add(user)
        .then(([ id ]) => {
            Users.findBy({ id })
            .then(user => {
                    // generate token
                    const token = generateToken(user);
                    // send token to the client
                    res.status(201).json({ token })
            })
            .catch(error => res.status(500).json({ err: error.message }))            
        })
        .catch((error) => res.status(500).json({ err: error.message }));
    }
})

// login existing user
router.post("/login", (req, res) => {
    let { username, password } = req.body;

    // look up by username
    Users.findBy({ username })
    .then(user => {
        // check that they're using the right password
        if(user && bcrypt.compareSync(password, user.password)){
            // proceed to log them in
            // produce token
            const token = generateToken(user);
            // send token to the client
            res.status(200).json({ token })
        } else {
            res.status(401).json({ message: "invalid username or password" })
        }
    })
    .catch(error => res.status(500).json({ err: error.message }))
})

function generateToken(user){
    const payload = {
        userId: user.id,
        username: user.username
    };
    const secret = secrets.jwtSecret;

    const options = {
        expiresIn: "1d"
    };

    return jwt.sign(payload, secret, options);
}

module.exports = router;