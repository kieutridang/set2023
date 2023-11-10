
const express = require('express'); // commonjs
const path = require('path');
const ejs = require('ejs');
const app = express(); // app express
const port = 8080

class UsersController {

    // [GET], users

    server(req, res) {
        res.render('users.ejs')
    }
}

module.exports = new usersController
