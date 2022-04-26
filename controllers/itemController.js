const Item = require("../models/Item.js");

exports.item_list = async function (req, res) {
  const item_list = await Item.find({}).populate("category").exec();
  res.json({ item_list: item_list });
};

exports.item = async function (req, res) {
  const item = await Item.findOne({ name: req.params.name }).exec();
  res.json({ item: item });
};
