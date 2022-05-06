const mongodb = require("mongodb");
const { database } = require("../app.js");
const categoriesCollection = database.collection("categories");

const Category = {
  name: { type: String, required: true },
  description: { type: String, required: true, maxlength: 200 },
};

exports.getAllCategories = async () => {
  // client.connect();
  const categories = await categoriesCollection.find({}).toArray();
  // client.close();
  return categories;
};

exports.getCategory = async (parameters) => {
  // client.connect();
  const category = await categoriesCollection.findOne(parameters);
  // client.close();
  return category;
};

exports.newCategory = async (category) => {
  // client.connect();
  const result = await categoriesCollection.insertOne(category);
  // client.close();
  return result;
};

exports.editCategory = async (_id, category) => {
  // client.connect();
  const filter = { _id: _id };
  const result = await categoriesCollection.updateOne(filter, category);
  // client.close();
  return result;
};

exports.deleteCategory = async (_id) => {
  // client.connect();
  const result = categoriesCollection.deleteOne({ _id: _id });
  // client.close();
  return result;
};
