const Repository = require('./base.repository')
const { projectModel } = require('../models')

const projectRepository = new Repository('project', projectModel)

module.exports = projectRepository