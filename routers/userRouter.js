const express = require("express");
// const formidable = require("formidable");
// const { v4: uuidv4 } = require("uuid");
// const indexController = require("../controllers/indexController");
const userController = require("../controllers/userController");
const router = express.Router();

router.route("/add-product").get(userController.getAddProduct);
router.route("/upload").post(userController.postUploadFile);
router.route("/add-product").post(userController.postAddProduct);
router.route("/products").get(userController.getAllProduct);
router.route("/delete-product").post(userController.deletProduct);
router.route("/products/:productId").get(userController.getEdit);
router.route("/upload/edit/:productId").post(userController.editImage)
router.route("/update-product").post(userController.uploadProduct)

module.exports = router;
