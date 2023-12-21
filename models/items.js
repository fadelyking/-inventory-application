const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemsSchema = new Schema({
	name: String,
	description: String,
	category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
	price: Number,
	stock: Number,
});

ItemsSchema.virtual("url").get(function () {
	return `/item/${this._id}`;
});

module.exports = mongoose.model("Item", ItemsSchema);
