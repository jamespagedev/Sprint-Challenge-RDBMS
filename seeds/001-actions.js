exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('actions')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('actions').insert([
        {
          project_id: 1,
          name: 'Setup Migrations and Database',
          description:
            'Creates migrations files and runs the knex command to create/update the database',
          notes: '',
          completed: true
        },
        {
          project_id: 1,
          name: 'Setup API',
          description:
            'Creates the API server, endpoint routers, middleware, and index',
          notes: 'needs testing data for endpoints',
          completed: false
        },
        {
          project_id: 1,
          name: 'Create seeds',
          description: 'Dummy data for testing endpoints',
          notes:
            ' even though the project says this is not required, I will do it anyway so I have something to test endpoints with',
          completed: true
        }
      ]);
    });
};
