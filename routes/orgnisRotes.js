const express = require('express');
 const upload=require("../utils/multer");

const orgnisController = require("../controllers/orgnisController");
const orgnisAuthControlle=require("../controllers/orgnisAuthController");
const router = express.Router();
router.post("/signup",orgnisAuthControlle.signup)
router.post("/login",orgnisAuthControlle.login)
router
  .route('/')
  .get(orgnisController.getAllOrgnis)
  .post(orgnisController.createOrgnis);

router
  .route('/:id')
  .get(orgnisController.getOrgnis)
  .patch(orgnisController.updateOrgnis)
  .delete(orgnisController.deleteOrgnis);

module.exports = router;
