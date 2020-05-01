const db = require('../database/connection');

module.exports = {
    add,
    remove,
    update,
    findAll,
    findById
}

function add(newPlant) {
    return db('plants').insert(newPlant, "id");
}

function remove(id) {
    return db('plants').where({ id }).del();
}

function update(id, changes){
    return db('plants').where({ id }).update(changes);
}

function findAll() {
    return db('plants');
}

function findById(id) {
    return db('plants').where({ id }).first();
}