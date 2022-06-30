const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");
require("dotenv").config();

const itemRouter = require("../routes/itemRouter");
const categoryRouter = require("../routes/categoryRouter");

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;

const client = new MongoClient(MONGO_URI);
client.connect();
const database = client.db("inventoryapplication");
module.exports.database = database;

const app = express();

app.use(logger("dev"));
app.use(compression());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(
  express.static(path.resolve(__dirname, ".", "dist"), { maxAge: "30d" })
);
app.use(function (req, res, next) {
  next(createError(404));
});
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.send("error");
});

// app.use(express.static(path.join(__dirname, "public")));
// app.use(express.static(path.join(__dirname, "client", "build"))); // production

app.get("/", (req, res) => {
  res.redirect("/items");
});

app.use("/items", itemRouter);
app.use("/categories", categoryRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;
module.exports.handler = serverless(app);
