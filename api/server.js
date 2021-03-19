const express = require('express');
const cors = require('cors');
const server = express();

server.use( express.json() );
server.use( cors() );

const ProjectRouter = require('./project/router');
const ResourceRouter = require('./resource/router');
const TaskRouter = require('./task/router');

server.use('/api/projects', ProjectRouter)
server.use('/api/resources', ResourceRouter)
server.use('/api/tasks', TaskRouter)

module.exports = server;