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
