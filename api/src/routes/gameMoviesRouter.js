const express = require('express');

const gameMoviesController = require('../controllers/gameMoviesController');

const gameMoviesRouter = express.Router();

gameMoviesRouter.get('/', gameMoviesController.index);
gameMoviesRouter.get('/:id', gameMoviesController.show);
gameMoviesRouter.post('/create', gameMoviesController.create);
gameMoviesRouter.patch('/:id/update', gameMoviesController.update);
gameMoviesRouter.post('/:id/delete', gameMoviesController.delete);

module.exports = gameMoviesRouter;
