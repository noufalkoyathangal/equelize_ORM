const models = require("../models");
const bcrypt = require("bcrypt");
const SALT_ROUND = 10;

exports.getRegister = (req, res) => {
  res.render("register");
};

exports.postRegister = async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let result = await models.User.findOne({
    where: {
      username: username,
    },
  });
  if (result == null) {
    const pass = await bcrypt.hash(password, SALT_ROUND);
    let user = models.User.build({
      username,
      password: pass,
    });
    let savedUser = await user.save();
    if (savedUser != null) {
      res.redirect("/login");
    } else {
      res.render("register", { message: "User already exist! 1" });
    }
  } else {
    res.render("register", { message: "User already exist! 2" });
  }
};

exports.getLogin = (req, res) => {
  res.render("login");
};

exports.postLogin = async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let user = await models.User.findOne({
    where: {
      username,
    },
  });
  if (user != null) {
    let result = await bcrypt.compare(password, user.password);
    if (result) {
      if (req.session) {
        req.session.user = { userId: user.id };
        res.redirect("users/add-product");
      }
    } else {
      res.render("login", { message: "Incorrect username or password!" });
    }
  } else {
    res.render("login", { message: "Incorrect username or password!" });
  }
};

exports.getLogout = (req, res, next) => {
  if (req.session) {
    req.session.destroy((error) => {
      if (error) {
        next(error);
      } else {
        res.redirect("/login");
      }
    });
  } else {
    res.redirect("/login");
  }
};

exports.getAllProduct = async (req, res) => {
  let products = await models.Product.findAll();
  res.render("index", { products: products });
};
// 122-123 has to many
exports.getProduct = async (req, res) => {
  const productId = req.params.productId;
  const product = await models.Product.findOne({
    include: [
      {
        model: models.Comment,
        as: "comments",
      },
    ],
    where: {
      id: productId,
    },
  });
  console.log(product.dataValues);
  res.render("product-details", product.dataValues);
};

exports.postComment = async (req, res) => {
  let productId = parseInt(req.body.productId);
  let title = req.body.title;
  let description = req.body.description;
  let comment = models.Comment.build({
    title,
    description,
    productId,
  });
  let saveComment = await comment.save();
  if (saveComment) {
    res.redirect(`/products/${productId}`);
  } else {
    res.redirect("/product-details", { message: "Error adding Comment ! " });
  }
};

//123 belongsTo
exports.getComment = async (req, res) => {
  let commentId = req.params.commentId;
  let comment = await models.Comment.findOne({
    include: [
      {
        model: models.Product,
        as: "product",
      },
    ],
    where: {
      id: commentId,
    },
  });
  console.log(comment);
  res.json(comment);
};
