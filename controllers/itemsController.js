const Item = require("../models/items");
const Category = require("../models/category");
const asyncHandler = require("express-async-handler");

exports.item_list = asyncHandler(async (req, res, next) => {
	const allItems = await Item.find().sort({ name: 1 }).exec();
	res.render("item_list", { title: "Item List", items_list: allItems });
});

exports.item_detail = asyncHandler(async (req, res, next) => {});

exports.item_create_get = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Items Create GET");
});

exports.item_create_post = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Items Create POST");
});

exports.item_delete_get = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Items Delete POST");
});

exports.item_delete_post = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Items Delete POST");
});

exports.item_update_get = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Item Update GET");
});

exports.item_update_post = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Item Update POST");
});
