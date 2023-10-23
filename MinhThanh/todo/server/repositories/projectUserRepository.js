const Repository = require('./baseRepository')
const { projectsUsersModel } = require('../models')

const projectUserRepository = new Repository('projectUser', projectsUsersModel)

module.exports = projectUserRepository
