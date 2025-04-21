const express = require('express');

const pationtController = require('../controllers/pationtController');
const router = express.Router();
router
  .route('/:id')
  .patch(pationtController.updateByDoctor)

module.exports = router;
