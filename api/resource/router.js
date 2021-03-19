const express = require("express");
const Resources = require("./model");
const Middleware = require("../middleware");
const router = express.Router();

router.get("/", (req, res) => {
  Resources.findAll()
    .then((resources) => {
      res.status(200).json(resources);
    })
    .catch(() => {
      res.status(500).json({ error: "Couldn't fetch resources" });
    });
});

router.get("/:id", Middleware.validateResourceId, function (req, res) {
  res.status(200).json(req.object);
});

router.post("/", Middleware.validateRequestBody, function (req, res) {
  Resources.create(req.body)
    .then((resource) => {
      res.status(201).json(resource);
    })
    .catch(() => {
      res.status(500).json({
        error: "There was an error while saving the resource to the database",
      });
    });
});

router.delete("/:id", Middleware.validateResourceId, (req, res) => {
  Resources.remove(req.object.id)
    .then(() => {
      res.status(204).json();
    })
    .catch(() => res.status(500).json({ error: "Could not delete resource" }));
});

router.put("/:id", Middleware.validateResourceId, Middleware.validateRequestBody, (req, res) => {
  Resources.update(req.object.id, req.body)
    .then((resource) => {
      res.status(200).json(resource);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});
module.exports = router;
