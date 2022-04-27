// Mongodb helper functions
require("dotenv").config();
const { MongoClient } = require("mongodb");
const MONGO_URI = process.env.MONGO_URI;

const client = new MongoClient(MONGO_URI);
const database = client.db("inventoryapplication");

module.exports = { client, database };
