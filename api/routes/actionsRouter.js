/***************************************************************************************************
 ******************************************* dependencies ******************************************
 **************************************************************************************************/
const express = require('express');
const db = require('../../data/dbConfig.js');
const actionValidation = require('../../middleware/actionValidation.js');
const router = express.Router();

/***************************************************************************************************
 ******************************************** middleware *******************************************
 **************************************************************************************************/
// None

/***************************************************************************************************
 ********************************************** routes *********************************************
 **************************************************************************************************/
// ------------------------------------- Create Endpoints (MVP) ------------------------------------
// /api/actions (create)
// not working...
// router.post('/', actionValidation, (req, res) => {
//   let newAction;
//   if (req.body.hasOwnProperty('completed')) {
//     const { project_id, description, notes, completed } = req.body;
//     newAction = { project_id, description, notes, completed };
//   } else {
//     const { project_id, description, notes } = req.body;
//     newAction = { project_id, description, notes };
//   }
//   db('projects')
//     .where({ id: newAction.project_id })
//     .then(project => {
//       if (project.length !== 0) {
//         db('actions')
//           .insert(newAction)
//           .then(result => {
//             res.status(201).json(`Created new action with id ${result}`);
//           })
//           .catch(err => {
//             console.log('found');
//             res.status(500).json({ message: err });
//           });
//       } else {
//         res.status(404).json({
//           message: `The project with the specific ID '${
//             newAction.project_id
//           }' does not exist`
//         });
//       }
//     })
//     .catch(err => {
//       res.status(500).json({ message: err });
//     });
// });

router.post('/', actionValidation, (req, res) => {
  db('actions')
    .insert(req.body)
    .then(result => {
      res.status(201).json(`Created new action with id ${result}`);
    })
    .catch(err => {
      console.log('found');
      res.status(500).json({ message: err });
    });
});

/***************************************************************************************************
 ********************************************* export(s) *******************************************
 **************************************************************************************************/
module.exports = router;
