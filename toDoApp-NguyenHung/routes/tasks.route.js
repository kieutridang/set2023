var express = require('express');
var router = express.Router();

/* GET tasks listing. */
//[GET] /tasks
router.get('/', function(req, res, next) {
  res.send('get all tasks');
  next();
});
//[POST] /tasks
router.post('/', function(req, res, next) {
  res.send('create new task');
  next();
});

//[GET] /tasks/:slug
router.get('/:slug', function(req, res, next) {
  res.send('get task by slug');
  next();
});

//[DELETE] /tasks/:slug
router.delete('/:slug', function(req, res, next) {
  res.send('tasks DELETE request');
  next();
});

//[PATCH] /tasks/:slug
router.patch('/', function(req, res, next) {
  res.send('tasks PATCH request');
  next();
});

module.exports = router;