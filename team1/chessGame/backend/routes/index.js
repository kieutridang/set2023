const express = require('express')
const Router = express.Router()
const accountRouter = require("./account.route.js")

Router.get('/', function (req, res) {
    console.log("Ahihi")
})

Router.use("/accounts", accountRouter)

module.exports = Router