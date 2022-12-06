const bcrypt = require("bcryptjs")
const pool = require("../Database/db");
const jwt= require("jsonwebtoken");
const jwt_key = process.env.JWT_SECRET 
const jwt_expire = process.env.JWT_EXPIRES
const express = require("express");
var cors = require('cors');
const app = express();
const port = process.env.PORT || 3000
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const companies = require("../static_files/socket_data");
app.use(express.json())
app.use(cors({origin: '*'}));

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