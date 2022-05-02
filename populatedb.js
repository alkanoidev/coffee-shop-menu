const userArgs = process.argv.slice(2);
const async = require("async");
const Item = require("./models/Item");
const Category = require("./models/Category");

const mongoose = require("mongoose");
const mongoDB =
  "mongodb+srv://root:root@cluster0.w8w3a.mongodb.net/inventoryapplication?retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const items = [];
const categories = [];

function itemCreate(name, description, price, category, cb) {
  const item = new Item({
    name: name,
    description: description,
    category: category,
    price: price,
  });
  item.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Item: " + item);
    cb(null, item);
    items.push(item);
  });
}

function categoryCreate(name, description, cb) {
  const category = new Category({ name: name, description: description });

  category.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Category: " + category);
    cb(null, category);
    categories.push(category);
  });
}

function createItems(cb) {
  async.series(
    [
      function (callback) {
        itemCreate(
          "Black",
          "Black coffee is as simple as it gets with ground coffee beans steeped in hot water, served warm. And if you want to sound fancy, you can call black coffee by its proper name: cafe noir. Since it isn’t doctored up with milk or sugar, the quality of coffee is especially important. Treat yourself to a coffee subscription box to find your favorite style.",
          0.5,
          categories[0],
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Latte",
          "As the most popular coffee drink out there, the latte is comprised of a shot of espresso and steamed milk with just a touch of foam. It can be ordered plain or with a flavor shot of anything from vanilla to pumpkin spice. (Here’s how to make a copycat Starbucks pumpkin spice latte.)",
          1,
          categories[0],
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Cappuccino",
          "Cappuccino is a latte made with more foam than steamed milk, often with a sprinkle of cocoa powder or cinnamon on top. Sometimes you can find variations that use cream instead of milk or ones that throw in flavor shot, as well.",
          1.2,
          categories[0],
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}

function createCategories(cb) {
  async.parallel(
    [
      function (callback) {
        categoryCreate("coffee", " ", cb)
      },
    ],
    // optional callback
    cb
  );
}

async.series(
  [createItems, createCategories],
  function (err, results) {
    if (err) {
      console.log("FINAL ERR: " + err);
    } else {
      console.log("Items: " + items);
    }
    mongoose.connection.close();
  }
);
