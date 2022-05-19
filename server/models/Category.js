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

exports.getCategory = (parameters) => {
  // client.connect();
  const category = categoriesCollection.findOne(parameters);
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
  let result;
  result = await categoriesCollection.updateOne(
    { _id: new mongodb.ObjectId(_id) },
    { $set: category },
    (err, res) => {
      if (err) result = err;
      result = res;
    }
  );
  // client.close();
  return result;
};

exports.deleteCategory = async (_id) => {
  // client.connect();
  const result = categoriesCollection.deleteOne({
    _id: new mongodb.ObjectId(_id),
  });
  // client.close();
  return result;
};
