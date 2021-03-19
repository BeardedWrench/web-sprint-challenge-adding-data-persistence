const express = require("express");
const Projects = require("./model");
const Middleware = require('../middleware')
const router = express.Router();

router.get( "/", ( req, res ) => {
  Projects.findAll()
    .then( projects => {
      res.status( 200 ).json( projects );
    } )
    .catch( () => {
      res.status( 500 ).json( { error: "Couldn't fetch projects" } );
    } );
} );

router.get( "/:id", Middleware.validateResourceId, function ( req, res ) {
  res.status( 200 ).json( req.object );
} );

router.post( "/", Middleware.validateRequestBody, function ( req, res ) {
  Projects.create(req.body)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch( error => {
      res.status( 500 ).json( {
        error: "There was an error while saving the project to the database",
        err: error.message
      } );
    } );
} );

router.delete( "/:id", Middleware.validateResourceId, ( req, res ) => {
  Projects.remove( req.object.id )
    .then( () => {
      res.status(204).json();
    } )
    .catch( () => res.status( 500 ).json( { error: "Could not delete project" } ) );
} );

router.put( "/:id", Middleware.validateResourceId, Middleware.validateRequestBody, ( req, res ) => {
  Projects.update( req.object.id, req.body )
    .then( project => {
      res.status( 200 ).json( project );
    } )
    .catch( err => {
      res.status( 500 ).json( err );
    } );
} );
module.exports = router;