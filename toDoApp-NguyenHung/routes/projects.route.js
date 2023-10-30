const express = require('express');
const router = express.Router();
const middlewares = require('../middlewares');
const ProjectController = require('../controllers/ProjectController');
const projectController = new ProjectController();

/* GET projects listing. */
//[GET] /projects
router.get('/', async function(req, res, next) {
    try {
        middlewares.authentication(req,res);
        const projects = await projectController.getProjects();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(projects));
        next();
      }
      catch (err) {
        res.statusCode = 401
        res.end("Authentication failed.")
      }
});

//[POST] /projects
router.post('/', async function(req, res, next) {
    const projectData = req.body;
    const project = await projectController.createProject(projectData);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.status(200).json(project);
    next();
});

//[GET] /projects/:slug
router.get('/:slug', async function(req, res, next) {
    try {
        const id = req.url.split("/")[1];
        const project = await projectController.getProject(id);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(project));
        next();
      } catch (error) {
        res.statusCode = 404
        res.end("Project not found.")
      }
});

//[DELETE] /projects/:slug
router.delete('/:slug', async function(req, res, next) {
    try {
        const id = req.url.split("/")[1];
        const message = await projectController.deleteProject(id);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(message));
        next();
      } catch (error) {
        res.statusCode = 404
        res.end("Project not found.")
      }
});

//[PATCH] /projects/:slug
router.patch('/', async function(req, res, next) {
    try {
        const id = req.url.split("/")[1];
        const newProject = req.body;
        const updatedProject = projectController.updateProject(id, newProject);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(updatedProject));
      } catch (error) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: error }));
      }
});

module.exports = router;