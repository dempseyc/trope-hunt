const express = require('express');

const gameMoviesController = require('../controllers/gameMoviesController');

const gameMoviesRouter = express.Router();

gameMoviesRouter.get('/', gameMoviesController.index);
gameMoviesRouter.get('/search', gameMoviesController.search);
gameMoviesRouter.post('/create', gameMoviesController.create);
gameMoviesRouter.get('/:id', gameMoviesController.show);
gameMoviesRouter.patch('/:id/update', gameMoviesController.update);
gameMoviesRouter.post('/:id/delete', gameMoviesController.delete);

module.exports = gameMoviesRouter;
