const db = require("../data/dbConfig.js");
const { request } = require("express");

module.exports = {
    insert,
    update,
    remove,
    find,
    findById,
};

async function insert(resource) {
    return db("resources")
        .insert(resource, "id")
        .then(ids => ids[0]);
}

async function update(id, changes) {
    return null;
}

function remove(id) {
    return db("resources").delete({id:id});
}

function find() {
    return db("resources");
}

function findById(id) {
    return db("resources").where({id: id}).first();
}
