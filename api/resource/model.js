const db = require("../../data/dbConfig.js");

const findAll = async () => {
    return await db("resources");
};

const findBy = (filter) => {
    return db("resources").where(filter);
};

const findById = async (resource_id) => {
    return db("resources").where({ resource_id }).first().select("*");
};

const create = async (resource) => {
    return db("resources")
        .insert(resource)
        .then(([resource_id]) => findById(resource_id));
};

const update = (resource_id, changes) => {
    return db("resources")
        .where({ resource_id })
        .first()
        .update(changes)
        .then((count) => (count > 0 ? findById(resource_id) : null));
};

const remove = async (resource_id) => {
    return await db("resources").where({ resource_id }).del();
};

module.exports = {
    findAll,
    findBy,
    findById,
    create,
    update,
    remove,
};
