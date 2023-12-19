const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemsSchema = new Schema({
	name: String,
	description: String,
	_category: Schema.Types.ObjectId,
	price: Number,
	stock: Number,
});

ItemsSchema.virtual("url").get(function () {
	return `/items/${this._id}`;
});

module.exports = mongoose.model("Item", ItemsSchema);
