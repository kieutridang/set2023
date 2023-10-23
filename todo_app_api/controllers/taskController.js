const {handleError} = require("../helpers");
const {handleAuthResponse, findTask, insertTask, updateTask, removeTask} = require("./helpers");

function getTasks(request, response) {
    const userId = request.body;
    console.log("userId ", userId);
    findTask(userId)
        .then(data => {
            console.log("data id", JSON.stringify(data));
            response.end(JSON.stringify(data))
        })
        .catch(err => {
            handleError(err, 'controllers/index.js', 'addTask')
            handleAuthResponse(response, false)
        })

    console.log("end getTasks funcction");
}

function editTask(request, response) {
    const task = request.body
    updateTask(task)
        .then((editedTask) => {
            console.log('Log: signUp -> editedTask', editedTask)
            handleAuthResponse(response, true)
        })
        .catch(err => {
            handleError(err, 'controllers/index.js', 'editTask')
            handleAuthResponse(response, false)
        })
}

function deleteTask(request, response) {
    const task = request.body
    removeTask(task)
        .then((deletedTask) => {
            console.log('Log: signUp -> deletedTask', deletedTask)
            handleAuthResponse(response, true)
        })
        .catch(err => {
            handleError(err, 'controllers/index.js', 'deleteTask')
            handleAuthResponse(response, false)
        })
}

function addTask(request, response) {
    const task = request.body
    insertTask(task)
        .then((insertedTask) => {
            console.log('Log: signUp -> insertedTask', insertedTask)
            handleAuthResponse(response, true)
        })
        .catch(err => {
            handleError(err, 'controllers/index.js', 'addTask')
            handleAuthResponse(response, false)
        })
}

module.exports = {
    getTasks,
    addTask,
    editTask,
    deleteTask,
};