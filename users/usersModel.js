const db = require('../database/connection');

module.exports = {
    add,
    update,
    findBy
}

function add(newUser) {
    return db('users').insert(newUser, "id");
}

function update(id, changes) {
    return db('users').where({ id }).update(changes);
}

function findBy(filter) {
    return db('users').where(filter).first();
}

