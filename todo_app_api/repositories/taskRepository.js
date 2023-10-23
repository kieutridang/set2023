const Repository = require("./baseRepository");
const {taskModel} = require('../models');

const taskRepository = new Repository('task', taskModel);

module.exports = taskRepository;
