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

exports.item_create_get = asyncHandler(async (req, res, next) => {
	const allCategories = await Category.find().sort({ name: 1 }).exec();

	res.render("item_form", { title: "Create Item", category_list: allCategories });
});

exports.item_create_post = [
	body("name", "Must contain at least 3 characters").trim().isLength({ min: 3 }).escape(),
	body("description", "Description must not be empty.").trim().isLength({ min: 1 }).escape(),
	body("price", "Price must not be empty.").trim().isLength({ min: 1 }).escape(),

	asyncHandler(async (req, res, next) => {
		const errors = validationResult(req);
		console.log(req.body.category);

		const item = new Item({
			name: req.body.name,
			description: req.body.description,
			price: req.body.price,
			category: req.body.category,
		});

		if (!errors.isEmpty()) {
			console.log(errors);
			res.render("item_form", {
				title: "Create Item",
				item: item,
				errors: errors.array(),
			});
			console.log(errors.array());
			return;
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
	const item = await Item.findById(req.params.id).populate("category").exec();

	if (item === null) {
		res.redirect("/items");
	}

	res.render("item_delete_form", { title: "Delete Item", item: item });
});

exports.item_delete_post = asyncHandler(async (req, res, next) => {
	console.log(req.body.itemid);
	await Item.findByIdAndDelete(req.body.itemid);
	res.redirect("/items");
});

exports.item_update_get = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Item Update GET");
});

exports.item_update_post = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Item Update POST");
});
