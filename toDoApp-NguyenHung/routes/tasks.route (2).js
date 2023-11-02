var express = require('express');
var router = express.Router();
const TaskController = require('../controllers/TaskController');
const taskController = new TaskController();

/* GET tasks listing. */
//[GET] /tasks
router.get('/', async function(req, res, next) {
  const tasks = await taskController.getTasks();
  res.status(200).json(tasks);
  next();
});
//[POST] /tasks
router.post('/', async function(req, res, next) {
  const taskData = req.body;
  const task = await taskController.createTask(taskData);
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.status(200).json(task);
  next();
});

//[GET] /tasks/:slug
router.get('/:slug', async function(req, res, next) {
  try {
    const id = req.url.split("/")[1];
    const task = await taskController.getTask(id);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(task));
    next();
  } catch (error) {
    res.statusCode = 404
    res.end("task not found.")
    next();
  }
});

//[DELETE] /tasks/:slug
router.delete('/:slug', async function(req, res, next) {
  try {
    const id = req.url.split("/")[1];
    const message = await taskController.deleteTask(id);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(message));
    next();
  } catch (error) {
    res.statusCode = 404
    res.end("task not found.")
    next();
  }
});

//[PATCH] /tasks/:slug
router.patch('/', async function(req, res, next) {
  try {
    const id = req.url.split("/")[1];
    const newTask = req.body;
    const updateTask = await taskController.updateTask(id, newTask);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(updateTask));
    next();
  } catch (error) {
    res.statusCode = 404;
    res.end("task not found.");
    next();
  }
});

module.exports = router;