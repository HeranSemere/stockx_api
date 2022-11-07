const bcrypt = require("bcryptjs")
const pool = require("../Database/db");
const jwt= require("jsonwebtoken");
const jwt_key = process.env.JWT_SECRET || 'cvTlQ37zikOavLwQ2yhMiCnJJoWo8fEXIPSOCUBKPDYS2pFwhH8EEkTHiHxx8iL'
const jwt_expire = process.env.JWT_EXPIRES || 864000
const express = require("express");
const app = express();
const port = process.env.PORT || 3000
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const companies = require("../static_files/socket_data");
app.use(express.json())

module.exports = {
    bcrypt: bcrypt,
    pool: pool,
    jwt: jwt,
    jwt_key: jwt_key,
    jwt_expire: jwt_expire,
    express: express,
    app: app,
    port: port,
    http: http,
    io: io,
    companies: companies
}