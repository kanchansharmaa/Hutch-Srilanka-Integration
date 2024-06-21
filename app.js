var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
require("dotenv").config();

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var sentOTP = require("./routes/sendOTP/sendOTP.router");
var registerOTP = require("./routes/registerOTP/registerOTP.router");
var callbacks=require('./routes/callback/callback.route')
var DeactivateUser = require("./routes/deactivateUser/deactivate.routes")
var RegisterUser = require("./routes/Register/resgister.routes")
var  checkuser=require('./routes/checkuser/checkuser.route')
var app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
       "http://localhost:3002",
      "http://sl.fitofyy.com",
      "http://sl.kidszonepro.com",
      "http://sl.gameofyy.com",
    ],
  })
);
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/send-otp", sentOTP);
app.use("/register-otp", registerOTP);
app.use('/callback-notify',callbacks)
app.use("/deactivate-user", DeactivateUser);
app.use("/register-user", RegisterUser);
app.use('/checkuser',checkuser)


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
