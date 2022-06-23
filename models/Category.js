const mongodb = require("mongodb");
const { database } = require("../functions/app");
const categoriesCollection = database.collection("categories");

const Category = {
  name: { type: String, required: true },
  description: { type: String, required: true, maxlength: 200 },
};

exports.getAllCategories = async () => {
  const categories = await categoriesCollection.find({}).toArray();
  return categories;
};

exports.getCategory = (parameters) => {
  const category = categoriesCollection.findOne(parameters);
  return category;
};

exports.newCategory = async (category) => {
  const result = await categoriesCollection.insertOne(category);
  return result;
};

exports.editCategory = (_id, category) => {
  let result;
  result = categoriesCollection.updateOne(
    { _id: new mongodb.ObjectId(_id) },
    { $set: category },
    (err, res) => {
      if (err) result = err;
      result = res;
    }
  );
  return result;
};

exports.deleteCategory = async (_id) => {
  let result;
  result = await categoriesCollection.deleteOne({ _id: _id });
  return result;
};
