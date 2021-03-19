const db = require("../../data/dbConfig.js");
const utils = require("../../data/utils");

const findAll = async () => {
  const tasks = await db("tasks")
    .join("projects", "tasks.project_id", "=", "projects.project_id")
    .select("tasks.*", "projects.project_name", "projects.project_description");
  return tasks.map((t) => utils.taskToBody(t));
};

const findById = async (task_id) => {
  const task = await db("tasks")
    .join("projects", "tasks.project_id", "=", "projects.project_id")
    .where({ task_id })
    .first()
    .select("tasks.*", "projects.project_name", "projects.project_description");
  return utils.taskToBody(task);
};

const create = async (task) => {
  return db("tasks")
    .insert(task)
    .then(([task_id]) => findById(task_id));
};

const update = (task_id, changes) => {
  return db("tasks")
    .where({ task_id })
    .first()
    .update(changes)
    .then((count) => (count > 0 ? findById(task_id) : null));
};

const remove = async (task_id) => {
  return await db("tasks").where({ task_id }).del();
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
