const express = require('express');
const doctorController = require('../controllers/doctorController');
const router = express.Router();
router
  .route('/:id')
  .patch(doctorController.pId)

module.exports = router;
