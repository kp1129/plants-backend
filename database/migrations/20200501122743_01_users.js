
exports.up = function(knex) {
    return knex.schema.createTable("users", tbl => {
        //   primary key
        tbl.increments('id');
        // username 
        tbl.string('username')
            .unique()
            .notNullable()
    
        // phoneNumber 
        tbl.string('phoneNumber', 10)
            .unique()
            .notNullable()
      
        // password - string, notNullable
        tbl.string('password')
            .notNullable();
      })
  
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users");
};
