const Item = require("../models/items");
const Category = require("../models/category");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.item_list = asyncHandler(async (req, res, next) => {
	const allItems = await Item.find().sort({ name: 1 }).exec();
	res.render("item_list", { title: "Item List", items_list: allItems });
});

exports.item_detail = asyncHandler(async (req, res, next) => {
	const item = await Item.findById(req.params.id).populate("category").exec();

	if (item === null) {
		const err = new Error("Item not found");
		err.status = 404;
		return next(err);
	}

	console.log(item);

	res.render("item_detail", {
		name: item.name,
		item: item,
	});
});

exports.item_create_get = (req, res, next) => {
	res.render("item_form", { title: "Create Item" });
};

exports.item_create_post = [
	body("name", "Must contain at least 3 characters").trim().isLength({ min: 3 }).escape(),
	body("description", "Description must not be empty.").trim().isLength({ min: 1 }).escape(),
	body("price", "Price must not be empty.").trim().isLength({ min: 1 }).escape(),

	asyncHandler(async (req, res, next) => {
		const errors = validationResult(req);

		const item = new Item({
			name: req.body.name,
			description: req.body.description,
			price: req.body.price,
			category: req.body.category,
		});

		if (!errors.isEmpty()) {
			res.render("item_form", {
				title: "Create Item",
				item: item,
				errors: errors.array(),
			});
		} else {
			const itemExists = await Item.findOne({ name: req.body.name }).exec();

			if (itemExists) {
				res.redirect(itemExists.url);
			} else {
				await item.save();
				res.redirect(item.url);
			}
		}
	}),
];

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
