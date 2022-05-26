const category = require("../models/category.js");
const axios = require("axios/index");
const { ObjectId } = require("mongodb");

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
  let result;
  const newCategory = req.body;
  category
    .getCategory(req.params)
    .then((res) => {
      category.editCategory(res._id, newCategory, function (err, res) {
        if (err) result = err;
        result = res;
      });
    })
    .catch((err) => {
      console.log(err);
    });
  res.json(result);
};

exports.deleteCategory = async (req, res) => {
  const category1 = await category.getCategory(req.params);
  const _id = new ObjectId(category1._id);
  const result = await category.deleteCategory(_id);
  res.json({ result: result });
};
