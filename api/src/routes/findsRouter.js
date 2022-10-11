const express = require('express');

const findsController = require('../controllers/findsController');

const findsRouter = express.Router();

findsRouter.get('/', findsController.index);
findsRouter.get('/:id', findsController.show);
findsRouter.post('/create', findsController.create);
findsRouter.put('/:id/update', findsController.update);
findsRouter.post('/:id/delete', findsController.delete);

module.exports = findsRouter;
