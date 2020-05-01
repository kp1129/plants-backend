
exports.up = function (knex) {
    return knex.schema.createTable("plants", (tbl) => {
      //   primary key
      tbl.increments("id");
      //   nickname
      tbl.string("nickname", 50).notNullable();
      // species
      tbl.string("species").notNullable();
      // image tile
      tbl.integer("imageTile").unsigned().notNullable();
      // notes
      tbl.string("notes", 255);
      // watering frequency
      tbl.string("wateringFrequency").notNullable();
      // foreign key: user_id
      tbl.integer('users_id').unsigned().notNullable().references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE');
    });
  };
  
  exports.down = function (knex) {
      return knex.schema.dropTableIfExists("plants");
  };
  