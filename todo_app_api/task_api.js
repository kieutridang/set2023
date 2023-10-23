const moduleTask = require("./dumy_task_data.js");

let idTodo = 0;

function findIndexIdTask(data, idTodo) {
    let arrId = data.map((item) => item.id);
    let foundId = arrId.indexOf(parseInt(idTodo));

    return foundId;
}

function findTask(id) {
    return moduleTask.lstTaskData.find((task) => {
        if (task.id === id) {
            return task;
        }
    });
}

function findTaskAndReplace(task) {
    const taskFound = findTask(task.id);

    if (taskFound) {
        for (let key in task) {
            taskFound[key] = task[key];
        }
        return true;
    } else {
        return false;
    }
}

function getRequestReturnRespone(req, res, callback) {
    let bodyData = "";

    req.on("data", chunk =>{
        bodyData += chunk.toString();
    });

    req.on("end", () =>{
        callback(res, JSON.parse(bodyData));
    });
}

function postMethodHandler(res, body) {
    try {
        let reqBody = body;
        
        if (reqBody && reqBody.content) {
            idTodo++;
            reqBody.id = idTodo;
            moduleTask.lstTaskData.push(reqBody);
        } else {
            throw new Error("Please enter info task");
        }

        res.setHeader("Content-Type", "application/json");
        res.setHeader('Cache-Control', 'no-cache');

        res.writeHead(200);
        res.write(JSON.stringify(moduleTask.lstTaskData));
        res.end();
    } catch (error) {
        res.writeHead(400);
        res.end(error.message);
    }
}

function putMethodHandler(res, body) {

    try {
        let reqBody = body;
        
        if (reqBody && reqBody.content && reqBody.id) {

            let response =  findTaskAndReplace(reqBody);

            if (!response) {
                throw new Error(`The task with id ${response.id} not found`);
            }
        } else {
            throw new Error("Please enter info task");
        }

        res.setHeader("Content-Type", "application/json");
        res.setHeader('Cache-Control', 'no-cache');

        res.writeHead(200);
        res.write(JSON.stringify(reqBody));
        res.end();
    } catch (error) {
        res.writeHead(400);
        res.end(error.message);
    }
}

function getMethodHandler(url, req, res) {
    // const idTodo = url.substring("/tasks".length + 1);
    // const taskInfo = findTask(parseInt(idTodo));
    
    if (moduleTask.lstTaskData) {
        res.setHeader("Content-Type", "application/json");
        res.setHeader('Cache-Control', 'no-cache');

        res.writeHead(200);
        res.end(JSON.stringify(moduleTask.lstTaskData));
    } else {
        res.writeHead(400);
        res.end(`The task id ${idTodo} is not exsist.`);
        return;
    }
}

function deleteMethodHandler(url, req, res) {
    const idTodo = url.substring("/tasks".length + 1);
    let foundId = findIndexIdTask(moduleTask.lstTaskData, idTodo);

    if (foundId != -1) {
        moduleTask.lstTaskData.splice(foundId, 1);

        res.setHeader("Content-Type", "application/json");
        res.setHeader('Cache-Control', 'no-cache');

        res.writeHead(200);
        res.end(`The task with id ${idTodo} is deleted.`);

    } else {
        res.writeHead(400);
        res.end(`The task with id ${idTodo} is not present.`);
        return;
    }
}

function task_api_process(method, url, req, res) {
    switch (method) {
        case "POST":
            getRequestReturnRespone(req, res, postMethodHandler);
            break;
        case "GET":
            getMethodHandler(url, req, res);
            break;
        case "PUT":
            getRequestReturnRespone(req, res, putMethodHandler);
            break;
        case "DELETE":
            deleteMethodHandler(url, req, res);
            break;
        default:
            break;
    }
}

module.exports = task_api_process;