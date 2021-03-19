const Projects = require("./project/model");
const Resources = require("./resource/model");
const Tasks = require("./task/model");

async function validateResourceId(req, res, next) {
  const id = String(req.params.id);

  let object;
  try {
    if (req.baseUrl === "/api/projects") {
      object = await Projects.findById(id);
    } else if (req.baseUrl === "/api/resources") {
      object = await Resources.findById(id);
    } else if (req.baseUrl === "/api/tasks") {
      object = await Tasks.findById(id);
    }

    if (object) {
      req.object = object;
      next();
    } else {
      res.status(404).send({ message: "Object with that ID not found" });
    }
  } catch {
    res.status(500).send({ message: "Unable to perform that request" });
  }
}

function validateRequestBody(req, res, next) {
  if (req.baseUrl === "/api/projects") {
    if (!req.body.project_name) {
      res.status(400).send({
        errorMessage: "Please provide name for the project.",
      });
    } else next();
  } else if (req.baseUrl === "/api/resources") {
    if (!req.body.resource_name) {
      res.status(400).send({
        errorMessage: "Please provide name for this resource.",
      });
    } else next();
  } else if (req.baseUrl === "/api/tasks") {
    if (!req.body.task_description || !req.body.project_id) {
      res.status(400).send({
        errorMessage:
          "Please provide description and project id for this task.",
      });
    } else next();
  }
}

module.exports = {
  validateResourceId,
  validateRequestBody,
};
