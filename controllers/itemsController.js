const Item = require("../models/items");
const Category = require("../models/category");
const asyncHandler = require("express-async-handler");

exports.category_list = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Items List");
});

exports.category_detail = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Item Detail");
});

exports.category_create_get = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Items Create GET");
});

exports.category_create_post = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Items Create POST");
});

exports.category_create_post = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Items Delete POST");
});

exports.category_update_get = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Item Update GET");
});

exports.category_update_post = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Item Update POST");
});
