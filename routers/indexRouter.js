const express = require("express");
const indexController = require("../controllers/indexController");
const router = express.Router();

router
  .route("/register")
  .get(indexController.getRegister)
  .post(indexController.postRegister);
router
  .route("/login")
  .get(indexController.getLogin)
  .post(indexController.postLogin);
router.route("/logout").get(indexController.getLogout);
module.exports = router;
