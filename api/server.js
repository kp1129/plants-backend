const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
// routers
const authRouter = require('../auth/authRouter');
const plantsRouter = require('../plants/plantsRouter');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/auth", authRouter);
server.use("api/plants", plantsRouter);

server.get("/", (req, res) => {
    res.status(200).json({ message: "API is up and running!" })
})


module.exports = server;