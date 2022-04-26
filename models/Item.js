const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Category = require("./Category");

const ItemSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: [{ type: Schema.Types.ObjectId, ref: "Category" }],
  price: { type: Number, required: true },
});

ItemSchema.virtual("url").get(() => {
  return `/shop/items/${this._id}`;
});

module.exports = mongoose.model("Item", ItemSchema);
