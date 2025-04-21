const express = require('express');
 const upload=require("../utils/multer");

const doctorController = require('../controllers/doctorController');
const doctorAuthController=require("../controllers/doctorAuthController");
const router = express.Router();
router.post("/signup",upload.single("image"),doctorAuthController.signup)
router.post("/login",doctorAuthController.login)
router.post("/forget_pass",doctorAuthController.forget_pass)
router
  .route('/')
  .get(doctorController.getAllDoctor)
  .post(doctorController.createDoctor);

router
  .route('/:id')
  .get(doctorController.getDoctor)
  .patch(doctorController.updateDoctor)
  .delete(doctorController.deleteDoctor);

module.exports = router;
