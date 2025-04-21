const express = require('express');
const orgnisController = require('../controllers/orgnisController');
const router = express.Router();
router
  .route('/:id')
  .patch(orgnisController.pationtId)

module.exports = router;
