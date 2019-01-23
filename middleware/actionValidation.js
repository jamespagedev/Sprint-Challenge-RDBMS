module.exports = (req, res, next) => {
  const action = req.body;
  let completedPropValid = true;

  // This is not working...
  // if (action.hasOwnProperty('completed')) {
  //   if (typeof action.completed === 'number') {
  //     if (action.completed !== 0 || action.completed !== 1) {
  //       console.log(action.completed);
  //       console.log(typeof action.completed);
  //       completedPropValid = false;
  //       res.status(400).json({
  //         message:
  //           "action property 'completed' must be a boolean of true or false"
  //       });
  //     }
  //   }
  // }

  if (!action.hasOwnProperty('project_id')) {
    res.status(400).json({ message: "Action missing 'project_id' property" });
  } else if (!action.hasOwnProperty('description')) {
    res.status(400).json({ message: "Action missing 'description' property" });
  } else if (!action.hasOwnProperty('notes')) {
    res.status(400).json({ message: "Action missing 'notes' property" });
  } else if (typeof action.project_id !== 'number') {
    res
      .status(400)
      .json({ message: "Action property 'project_id' must be a number" });
  } else if (typeof action.description !== 'string') {
    res
      .status(400)
      .json({ message: "Action property 'description' must be a string" });
  } else if (typeof action.notes !== 'string') {
    res
      .status(400)
      .json({ message: "Action property 'notes' must be a string" });
  } else if (!action.description) {
    res
      .status(400)
      .json({ message: 'Please fill in the description for the Action' });
  } else if (action.description.length > 128) {
    res.status(400).json({
      message: 'Action description is too long. Use up to  128 characters'
    });
  } else if (completedPropValid) {
    next();
  }
};
