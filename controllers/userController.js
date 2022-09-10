// const express = require("express");
const formidable = require("formidable");
const { v4: uuidv4 } = require("uuid");
const models = require("../models");
let uniqueFilename = "";
exports.getAddProduct = (req, res) => {
  res.render("users/add-product");
};

function uploadFile(req, callback) {
  new formidable.IncomingForm()
    .parse(req)
    .on("fileBegin", (name, file) => {
      uniqueFilename = `${uuidv4()}.${file.name.split(".").pop()}`;
      file.name = uniqueFilename;
      file.path = __basedir + "/uploads/" + file.name;
    })
    .on("file", (name, file) => {
      callback(file.name);
    });
}
exports.postUploadFile = (req, res) => {
  uploadFile(req, (photoURL) => {
    photoURL = `/uploads/${photoURL}`;
    res.render("users/add-product", {
      imageURL: photoURL,
      className: "product-preview-image",
    });
  });
};

exports.postAddProduct = async (req, res) => {
  let title = req.body.title;
  let description = req.body.description;
  let price = parseFloat(req.body.price);
  let userId = req.session.user.userId;
  let product = models.Product.build({
    title,
    description,
    price,
    userId,
    imageURL: uniqueFilename,
  });
  let persistedProduct = await product.save();
  if (persistedProduct != null) {
    res.redirect("/users/products");
  } else {
    res.redirect("/users/add-product", { message: "Unable to add product" });
  }
};

exports.getAllProduct = async (req, res) => {
  let products = await models.Product.findAll({
    where: {
      userId: req.session.user.userId,
    },
  });
  res.render("users/products", { products: products });
};

exports.deletProduct = async (req, res) => {
  let productId = parseInt(req.body.productId);
  let delProduct = await models.Product.destroy({
    where: {
      id: productId,
    },
  });
  res.redirect("/users/products");
};
exports.getEdit = async (req, res) => {
  let productId = req.params.productId;
  let product = await models.Product.findByPk(productId);
  res.render("users/edit", product.dataValues);
};
exports.editImage = (req, res) => {
  uploadFile(req, async (photoURL) => {
    let productId = req.params.productId;
    let product = await models.Product.findByPk(productId);
    let response = product.dataValues;
    response.imageURL = photoURL;
    res.render("users/edit", response);
  });
};
