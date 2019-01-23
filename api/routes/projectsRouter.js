/***************************************************************************************************
 ******************************************* dependencies ******************************************
 **************************************************************************************************/
const express = require('express');
const db = require('../../data/dbConfig.js');
const projectValidation = require('../../middleware/projectValidation.js');
const router = express.Router();

/***************************************************************************************************
 ******************************************** middleware *******************************************
 **************************************************************************************************/
// None

/***************************************************************************************************
 ********************************************** routes *********************************************
 **************************************************************************************************/
// ------------------------------------- Create Endpoints (MVP) ------------------------------------
router.get('/', (req, res) => {
  db('projects')
    .then(projects => {
      projects = projects.map(project => ({
        ...project,
        completed: !!project.completed
      }));
      res.status(200).json(projects);
    })
    .catch(err => res.status(500).json(err));
});

// /api/projects/:id (get project with details)
router.get('/:id', (req, res) => {
  db('projects')
    .join('actions', 'actions.project_id', 'projects.id')
    .where({ 'projects.id': req.params.id })
    .then(projectActions => {
      const actions = projectActions.map(action => ({
        ...action,
        completed: !!action.completed
      }));
      db('projects')
        .where({ 'projects.id': req.params.id })
        .then(project => {
          project[0].completed = !!project[0].completed
          project[0].actions = actions;
          res.status(200).json(project[0]);
        });
    })
    .catch(err => res.status(500).json(err));
});

// /api/projects (create)
router.post('/', projectValidation, (req, res) => {
  let newProject;
  if (req.body.hasOwnProperty('completed')) {
    const { name, description, completed } = req.body;
    newProject = { name, description, completed };
  } else {
    const { name, description } = req.body;
    newProject = { name, description };
  }
  db('projects')
    .insert(newProject)
    .then(result => {
      res.status(201).json(`Created new project with id ${result}`);
    })
    .catch(err => res.status(500).json({ message: err }));
});

/***************************************************************************************************
 ********************************************* export(s) *******************************************
 **************************************************************************************************/
module.exports = router;
