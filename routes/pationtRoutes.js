const express = require('express');
const upload=require("../utils/multer");
const pationtController = require('../controllers/pationtController');
const pationtAuthController=require("../controllers/pationtAuthController");
const router = express.Router();
router.post("/signup",upload.single("image"),pationtAuthController.signup)
router.post("/login",pationtAuthController.login)
router.post("/forget_pass",pationtAuthController.forget_pass)
router
  .route('/')
  .get(pationtController.getAllPationts)
  .post(pationtController.createPationt);

router
  .route('/:id')
  .get(pationtController.getPationt)
  .patch(pationtController.updatePationt)
  .delete(pationtController.deletePationt);

module.exports = router;
