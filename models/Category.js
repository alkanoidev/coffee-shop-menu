const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true, maxlength: 200 },
});

CategorySchema.virtual("url").get(() => {
  return `/shop/categories/${this._id}`;
});

module.exports = mongoose.model("Category", CategorySchema);
