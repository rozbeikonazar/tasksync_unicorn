const express = require("express");
const logger = require("morgan");
const users = require("./routes/users");
const workspaces = require("./routes/workspaces");
const session = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");
const cors = require("cors");
const {
  FRONTEND_ORIGIN,
  SESSION_SECRET,
  COOKIE_SECRET,
  MONGO_URI,
} = require("./config");
require("./strategies/local-strategy");

const app = express();

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(`Error: ${err}`));
app.use(
  cors({
    origin: FRONTEND_ORIGIN,
    credentials: true,
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser(COOKIE_SECRET));
app.use(
  session({
    secret: SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 60,
      sameSite: "None",
      secure: true,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/api/user", users.router);
app.use("/api/workspaces", workspaces.router);

app.use(function (err, req, res, next) {
  console.error(err);
  // Send a JSON response with the error message
  res.status(err.status || 500).json({ error: err.message });
});

module.exports = app;
