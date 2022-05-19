const category = require("../models/category.js");
const { ObjectId } = require("mongodb");
const axios = require("axios/index");

exports.categoryList = async (req, res) => {
  res.json({ categoryList: await category.getAllCategories() });
};

exports.category = (req, res) => {
  res.json({ category: category.getCategory(req.params) });
};

exports.newCategory = async (req, res) => {
  const result = category.newCategory(req.body);
  res.json({ result: result });
};

exports.editCategory = async (req, res) => {
  let result;
  const newCategory = req.body;
  category.getCategory(req.params).then((res) => {
    category.editCategory(res._id, newCategory, function(err, res) {
      if(err) result=err
      result = res;
    });
  });
  // const result = await category.editCategory(_id, newCategory);
  res.json(result);
};

exports.deleteCategory = async (req, res) => {
  const _id = category.getCategory(req.params)._id;
  const result = await category.deleteCategory(_id);
  res.json({ result: result });
};