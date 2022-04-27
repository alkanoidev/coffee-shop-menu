const mongodb = require("mongodb");
const { client, database } = require("../mongoHelper.js");

const Item = {
  name: { type: String, required: true },
  description: { type: String, required: true },
  categoryName: { type: String, required: true },
  categoryId: { type: String, required: true },
  price: { type: Number, required: true },
};
const itemsCollection = database.collection("items");

exports.getAllItems = async () => {
  await client.connect();
  const itemList = await itemsCollection.find({}).toArray();
  await client.close();
  return itemList;
};

exports.getItem = async (parameters) => {
  await client.connect();
  const item = await itemsCollection.findOne(parameters);
  await client.close();
  return item;
};

exports.newItem = async (item) => {
  await client.connect();
  const result = await itemsCollection.insertOne(item);
  await client.close()
  return result;
};

exports.editItem = async (_id, item) => {
  await client.connect();
  const filter = { _id: _id };
  const result = await itemsCollection.updateOne(filter, item);
  return result;
};

exports.deleteItem = async (item) => {
  await client.connect()
  const result = itemsCollection.deleteOne(item);
  await client.close()
  return result;
}
