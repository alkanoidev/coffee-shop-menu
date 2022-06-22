const item = require("../models/Item.js");
const category = require("../models/Category.js");
const { ObjectId } = require("mongodb");

exports.itemList = async (req, res) => {
  const itemList = await item.getAllItems();
  res.json({ itemList: itemList });
};

exports.item = async (req, res) => {
  res.json({ item: await item.getItem(req.params) });
};

exports.search = async (req, res) => {
  res.json({ items: await item.search(req.params.substring) });
};

exports.newItem = async (req, res) => {
  const categoryName = req.params.category;
  const myCategory = await category.getCategory({ name: categoryName });
  const categoryId = new ObjectId(myCategory._id);
  const myItem = { ...req.body, categoryId: categoryId };

  const result = item.newItem(myItem);
  res.json({ result: result });
};

exports.editItem = async (req, res) => {
  let result;
  const newItem = req.body;
  await item.getItem(req.params).then((res) => {
    item.editItem(res._id, newItem, (err, res) => {
      if (err) result = err;
      result = res;
    });
  });
  res.json(result);
};

exports.deleteItem = async (req, res) => {
  const item1 = await item.getItem(req.params);
  const _id = new ObjectId(item1._id);
  const result = await item.deleteItem(_id);
  res.json({ result: result });
};

exports.getByCategory = async (req, res) => {
  const category = req.params.category;
  let result;

  result = await item.getByCategory(category);

  res.json({ itemList: result });
};
