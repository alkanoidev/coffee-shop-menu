const mongodb = require("mongodb");
const { ObjectId } = require("mongodb");
const { database } = require("../functions/app");

const Item = {
  name: { type: String, required: true },
  description: { type: String, required: true },
  categoryName: { type: String, required: true },
  categoryId: { type: String, required: true },
  price: { type: Number, required: true },
};
const itemsCollection = database.collection("items");

exports.getAllItems = async () => {
  const itemList = await itemsCollection.find({}).toArray();
  return itemList;
};

exports.getItem = async (parameters) => {
  const item = itemsCollection.findOne(parameters);
  return item;
};

exports.search = async (substring) => {
  const query = {
    $or: [
      { name: new RegExp(substring, "i") },
      { price: new RegExp(substring, "i") },
    ],
  };
  let result;
  try {
    result = await itemsCollection.find(query).toArray();
  } catch (err) {
    result = err;
  } finally {
    return result;
  }
};

exports.newItem = async (item) => {
  const result = await itemsCollection.insertOne(item);
  return result;
};

exports.editItem = async (_id, item) => {
  let result;
  result = await itemsCollection.updateOne(
    { _id: new ObjectId(_id) },
    { $set: item }
  );
  return result;
};

exports.deleteItem = async (_id) => {
  const result = await itemsCollection.deleteOne({ _id: _id });
  return result;
};

exports.getByCategory = async (category) => {
  let result;
  result = await itemsCollection.find({ category: category }).toArray();
  return result;
};
