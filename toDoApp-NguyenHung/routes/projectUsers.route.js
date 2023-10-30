const express = require('express');
const router = express.Router();
const ProjectUserController = require("../controllers/projectUserController")
const projectUserController = new ProjectUserController();

/* GET projectUsers listing. */
//[GET] /projectUsers
router.get('/', async function(req, res, next) {
  const projectUsers = await projectUserController.getProjectUsers();
  res.status(200).json(projectUsers);
  next();
});
//[POST] /projectUsers
router.post('/', async function(req, res, next) {
  const projectUserData = req.body;
      const projectUser = await projectUserController.createProjectUser(projectUserData);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.status(200).json(projectUser);
      next();
});

//[GET] /projectUsers/:slug
router.get('/:slug', async function(req, res, next) {
  try {
    const id = req.url.split("/")[1];
    const projectUser = await projectUserController.getProjectUser(id);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(projectUser));
    next();
  } catch (error) {
    res.statusCode = 404
    res.end("ProjectUser not found.")
    next();
  }
});

//[DELETE] /projectUsers/:slug
router.delete('/:slug', async function(req, res, next) {
  try {
    const id = req.url.split("/")[1];
    const message = await projectUserController.deleteProjectUser(id);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(message));
    next();
  } catch (error) {
    res.statusCode = 404
    res.end("ProjectUser not found.")
    next();
  }
});

//[PATCH] /projectUsers/:slug
router.patch('/', async function(req, res, next) {
  try {
    const id = req.url.split("/")[1];
    const newProjectUser = req.body;
    const updateProjectUser = await projectUserController.updateProjectUser(id, newProjectUser);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(updateProjectUser));
    next();
  } catch (error) {
    res.statusCode = 404
    res.end("ProjectUser not found.")
    next();
  }
});

module.exports = router;