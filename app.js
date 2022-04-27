const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const port = process.env.PORT || 3001;
const { MongoClient } = require("mongodb");
const cors = require("cors");

const itemRouter = require("./routes/itemRouter");
const categoryRouter = require("./routes/categoryRouter");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
// app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "client", "build")));

app.get("/", (req, res) => {
  res.redirect("/items");
});

app.use("/items", itemRouter);
app.use("/categories", categoryRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.send("error");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
