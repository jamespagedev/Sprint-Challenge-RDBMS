exports.up = function(knex, Promise) {
  return knex.schema.createTable('actions', function(tbl) {
    // Primary Key 'id'
    tbl.increments();

    // reference key
    tbl
      .integer('project_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('projects');

    // Other Columns
    tbl
      .string('name', 128)
      .notNullable()
      .unique();
    tbl.text('description').notNullable();
    tbl.text('notes');
    tbl.boolean('completed').defaultTo(false);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('actions');
};
