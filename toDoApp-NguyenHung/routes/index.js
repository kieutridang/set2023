const express = require('express');
const router = express.Router();
const userRoute = require('./users.route');
const projectRoute = require('./projects.route');
const projectUserRoute = require('./projectUsers.route');
const taskRoute = require('./tasks.route');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.json({message: 'Welcome to the API by nguyenhung :3'});
    next();
});

router.use('/users', userRoute);
router.use("/projects", projectRoute);
router.use("/projectUsers", projectUserRoute);
router.use("/tasks", taskRoute);

module.exports = router;
