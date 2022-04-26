const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const port = process.env.PORT || 3001;
const mongoose = require("mongoose");
const cors = require("cors");

const indexRouter = require("./routes/index");

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

app.use("/items", indexRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.send("error");
});

const mongoDB =
  "mongodb+srv://root:root@cluster0.w8w3a.mongodb.net/inventoryapplication?retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
