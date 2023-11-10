const jwt = require('jsonwebtoken')
const { handleAuthResponse, getProject, editProject, deleteProject, addProject } = require('./helpers')
const { handleError } = require('../helpers')

function createProject(request, response) {
    const project = request.body
    addProject(project)
    .then((addedProject) => {
        console.log('Log: signUp -> addedProject', addedProject)
        handleAuthResponse(response, true)
    })
    .catch(err => {
        handleError(err, 'controllers/index.js', 'addProject')
        handleAuthResponse(response, false)
        })
}


function updateProject(request, response) {
    const project = request.body
    editProject(project)
        .then((editedProject) => {
            console.log('Log: signUp -> editedProject', editedProject)
            handleAuthResponse(response, true)
        })
        .catch(err => {
            handleError(err, 'controllers/index.js', 'editProject')
            handleAuthResponse(response, false)
        })
}

function removeProject(request, response) {
    const project = request.body
    deleteProject(project)
        .then((deletedProject) => {
            console.log('Log: signUp -> deletedProject', deletedProject)
            handleAuthResponse(response, true)
        })
        .catch(err => {
            handleError(err, 'controllers/index.js', 'deleteProject')
            handleAuthResponse(response, false)
        })
}

function findProject(request, response) {
    const project = request.body
    getProject(project)
        .then((insertedProject) => {
            console.log('Log: signUp -> insertedProject', insertedProject)
            handleAuthResponse(response, true)
        })
        .catch(err => {
            handleError(err, 'controllers/index.js', 'getProject')
            handleAuthResponse(response, false)
        })
}

module.exports = {
    createProject,
    findProject,
    updateProject,
    removeProject
}