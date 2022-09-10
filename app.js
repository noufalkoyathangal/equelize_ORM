const express = require("express");
const app = express();
const path = require("path");
const userRouter = require("./routers/userRouter");
const indexRouter = require("./routers/indexRouter");
// const Auth = require("./utils/autherization");
const mustacheExpress = require("mustache-express");
const session = require("express-session");

app.use(
  session({
    secret: "asdwegcdfghliuywqrdf",
    resave: true,
    saveUninitialized: true,
  })
);

const VIEWS_PATH = path.join(__dirname, "/views");

global.__basedir = __dirname;

app.use("/uploads", express.static("uploads"));
app.use("/css", express.static("css"));

app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.locals.authenticated = req.session.user == null ? false : true;
  next();
});

app.use("/", indexRouter);
app.use("/users", userRouter);
// app.use("/", Auth, userRouter);

// http://localhost:3000/site.css
// app.use("/css", express.static("css"));

app.engine("mustache", mustacheExpress(VIEWS_PATH + "/partials", ".mustache"));
app.set("views", VIEWS_PATH);
app.set("view engine", "mustache");

module.exports = app;
