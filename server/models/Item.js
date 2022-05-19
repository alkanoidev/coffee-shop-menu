const mongodb = require("mongodb");
const { ObjectId } = require("mongodb");
const { database } = require("../app.js");

const Item = {
  name: { type: String, required: true },
  description: { type: String, required: true },
  categoryName: { type: String, required: true },
  categoryId: { type: String, required: true },
  price: { type: Number, required: true },
};
const itemsCollection = database.collection("items");

exports.getAllItems = async () => {
  // client.connect();
  const itemList = await itemsCollection.find({}).toArray();
  // client.close();
  return itemList;
};

exports.getItem = async (parameters) => {
  // client.connect();
  const item = itemsCollection.findOne(parameters);
  // client.close();
  return item;
};

exports.newItem = async (item) => {
  // client.connect();
  const result = await itemsCollection.insertOne(item);
  // client.close();
  return result;
};

exports.editItem = async (_id, item) => {
  // client.connect();
  let result;
  result = await itemsCollection.updateOne({ _id: new ObjectId(_id) }, { $set: item });
  // client.close();
  return result;
};

exports.deleteItem = async (_id) => {
  // client.connect();
  const result = await itemsCollection.deleteOne({ _id: _id });
  // client.close();
  return result;
};
