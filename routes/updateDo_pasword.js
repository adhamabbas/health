const express = require('express');
const doctorController = require('../controllers/doctorController');
const router = express.Router();
router
  .route('/:id')
  .patch(doctorController.updateDo_password)

module.exports = router;
