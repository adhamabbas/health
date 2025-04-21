const express = require('express');
const upload=require("../utils/multer");
const pationtController = require('../controllers/pationtController');
const router = express.Router();
router
  .route('/:id')
  .patch(upload.single("image"),pationtController.updateimage)

module.exports = router;
