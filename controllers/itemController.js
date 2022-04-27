const { client, database } = require("../mongoHelper.js");
const item = require("../models/Item.js");
const category = require("../models/Category.js");

exports.itemList = async (req, res) => {
  res.json({ itemList: await item.getAllItems() });
};

exports.item = async (req, res) => {
  res.json({ item: await item.getItem(req.params) });
};

exports.newItem = async (req, res) => {
  const categoryName = req.params.category;
  const categoryId = await category.getCategory({ name: categoryName })._id;

  const result = item.newItem({ ...req.body.item, categoryId });
  res.json({ result: result });
};

exports.editItem = async (req, res) => {
  const newItem = req.body.item;
  const _id = await item.getItem(req.params)._id;
  const result = await item.editItem(_id, newItem);
  res.json({ result: result });
};

exports.deleteItem = async (req, res) => {
  const item1 = await item.getItem(req.params);
  const result = await item.deleteItem(item1);
  res.json({ result: result });
};
