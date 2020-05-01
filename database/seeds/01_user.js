
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
 
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'katya01', password: 'password', phoneNumber: "6300000001"}
      ]);
    });
};
