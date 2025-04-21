const express = require('express');
const upload=require("../utils/multer");
const doctorController = require('../controllers/doctorController');
const router = express.Router();
router
  .route('/:id')
  .patch(upload.single("image"),doctorController.update_picture)

module.exports = router;
