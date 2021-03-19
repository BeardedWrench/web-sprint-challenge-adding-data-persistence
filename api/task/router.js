const express = require("express");
const Tasks = require("./model");
const Middleware = require("../middleware");
const router = express.Router();

router.get("/", (req, res) => {
  Tasks.findAll()
    .then((tasks) => {
      res.status(200).json(tasks);
    })
    .catch(() => {
      res.status(500).json({ error: "Couldn't fetch tasks" });
    });
});

router.get("/:id", Middleware.validateResourceId, function (req, res) {
  res.status(200).json(req.object);
});

router.post("/", Middleware.validateRequestBody, function (req, res) {
  Tasks.create(req.body)
    .then((task) => {
      res.status(201).json(task);
    })
    .catch((e) => {
      res.status(500).json({
        error: "There was an error while saving the task to the database",
        err: e.message,
      });
    });
});

router.delete("/:id", Middleware.validateResourceId, (req, res) => {
  Tasks.remove(req.object.id)
    .then(() => {
      res.status(204).json();
    })
    .catch(() => res.status(500).json({ error: "Could not delete task" }));
});

router.put("/:id", Middleware.validateResourceId, Middleware.validateRequestBody, (req, res) => {
  Tasks.update(req.object.id, req.body)
    .then((task) => {
      res.status(200).json(task);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});
module.exports = router;
