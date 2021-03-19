const db = require("../../data/dbConfig");
const utils = require('../../data/utils')

const findAll = async () => {
  const projects = await db('projects');
  return projects.map( project => utils.projectToBody( project ) );
};

const findById = async (project_id) => {
  const project = await db('projects').where({ project_id }).first().select('*');
  return utils.projectToBody( project );
};

const create = async (project) => {
  console.log(project);
  return db('projects')
    .insert(project)
    .then(([project_id]) => findById(project_id));
};

const update = (project_id, changes) => {
  return db('projects')
    .where({ project_id })
    .first()
    .update(changes)
    .then(count => (count > 0 ? findById(project_id) : null));
};

const remove = async (project_id) => {
  return await db('projects').where({ project_id }).del();
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};