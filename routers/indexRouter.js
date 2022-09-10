const express = require("express");
const indexController = require("../controllers/indexController");
const router = express.Router();

router.route("/").get(indexController.getAllProduct);
router
  .route("/register")
  .get(indexController.getRegister)
  .post(indexController.postRegister);
router
  .route("/login")
  .get(indexController.getLogin)
  .post(indexController.postLogin);
router.route("/logout").get(indexController.getLogout);
router.route("/products/:productId").get(indexController.getProduct);
router.route("/add-comment").post(indexController.postComment);
//123 belognsTo
router.route("/comments/:commentId").get(indexController.getComment);
module.exports = router;
