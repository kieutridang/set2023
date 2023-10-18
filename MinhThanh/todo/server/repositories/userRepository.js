const Repository = require('./baseRepository')
const { userModel } = require('../models')

const userRepository = new Repository('user', userModel)

module.exports = userRepository
