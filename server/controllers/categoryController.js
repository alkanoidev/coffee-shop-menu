const category = require("../models/category.js");

exports.categoryList = async (req, res) => {
  res.json({ categoryList: await category.getAllCategories() });
};

exports.category = async (req, res) => {
  res.json({ category: await category.getCategory(req.params) });
};

exports.newCategory = async (req, res) => {
  const result = category.newCategory(req.body);
  res.json({ result: result });
};

exports.editCategory = async (req, res) => {
  const newCategory = req.body.category;
  const _id = await category.getCategory(req.params)._id;
  const result = await category.editCategory(_id, newCategory);
  res.json({ result: result });
};

exports.deleteCategory = async (req, res) => {
  const category1 = await category.getCategory(req.params);
  const result = await category.deleteCategory(category1);
  res.json({ result: result });
};
