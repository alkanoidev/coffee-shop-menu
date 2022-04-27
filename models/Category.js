const mongodb = require("mongodb");
const { client, database } = require("../mongoHelper.js");
const categoriesCollection = database.collection("categories");

const Category = {
  name: { type: String, required: true },
  description: { type: String, required: true, maxlength: 200 },
};

exports.getAllCategories = async () => {
  await client.connect()
  const categories = await categoriesCollection.find({}).toArray();
  await client.close()
  return categories;
}

exports.getCategory = async (parameters) => {
  await client.connect();
  const category = await categoriesCollection.findOne(parameters);
  await client.close();
  return category;
};

exports.newCategory= async (category) => {
  await client.connect();
  const result = await categoriesCollection.insertOne(category);
  await client.close()
  return result;
};

exports.editCategory = async (_id, category) => {
  await client.connect();
  const filter = { _id: _id };
  const result = await categoriesCollection.updateOne(filter, category);
  return result;
};

exports.deleteItem = async (category) => {
  await client.connect()
  const result = categoriesCollection.deleteOne(category);
  await client.close()
  return result;
}
