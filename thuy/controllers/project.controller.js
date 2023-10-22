const jwt = require('jsonwebtoken')
const { handleAuthResponse, findProject, updateProject, removeProject } = require('./helpers')
const { handleError } = require('../helpers')


function editProject(request, response) {
    const project = request.body
    updateProject(project)
        .then((editedProject) => {
            console.log('Log: signUp -> editedProject', editedProject)
            handleAuthResponse(response, true)
        })
        .catch(err => {
            handleError(err, 'controllers/index.js', 'editProject')
            handleAuthResponse(response, false)
        })
}

function deleteProject(request, response) {
    const project = request.body
    removeProject(project)
        .then((deletedProject) => {
            console.log('Log: signUp -> deletedProject', deletedProject)
            handleAuthResponse(response, true)
        })
        .catch(err => {
            handleError(err, 'controllers/index.js', 'deleteProject')
            handleAuthResponse(response, false)
        })
}

function addProject(request, response) {
    const project = request.body
    insertProject(project)
        .then((insertedProject) => {
            console.log('Log: signUp -> insertedProject', insertedProject)
            handleAuthResponse(response, true)
        })
        .catch(err => {
            handleError(err, 'controllers/index.js', 'addProject')
            handleAuthResponse(response, false)
        })
}

module.exports = {
    addProject,
    editProject,
    deleteProject,
}