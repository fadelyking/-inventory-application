const Category = require("../models/category");
const Items = require("../models/items");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.category_list = asyncHandler(async (req, res, next) => {
	const allCategories = await Category.find().sort({ name: 1 }).exec();
	res.render("category_list", { title: "Category List", category_list: allCategories });
});

exports.category_detail = asyncHandler(async (req, res, next) => {
	const category = await Category.findById(req.params.id).exec();

	if (category === null) {
		const err = new Error("Category not found");
		err.status = 404;
		return next(err);
	}
	res.render("category_detail", { title: "Category", category: category });
});

exports.category_create_get = (req, res, next) => {
	res.render("category_form", { title: "Create Category" });
};

exports.category_create_post = [
	body("name", "Must contain at least 3 characters").trim().isLength({ min: 3 }).escape(),
	body("description", "Description must not be empty.").trim().isLength({ min: 1 }).escape(),

	asyncHandler(async (req, res, next) => {
		const errors = validationResult(req);

		const category = new Category({
			name: req.body.name,
			description: req.body.description,
		});

		if (!errors.isEmpty()) {
			res.render("item_form", {
				title: "Create Item",
				item: item,
				errors: errors.array(),
			});
			return;
		} else {
			const categoryExists = await Category.findOne({ name: req.body.name }).exec();

			if (categoryExists) {
				res.redirect(categoryExists.url);
			} else {
				await category.save();
				res.redirect(category.url);
			}
		}
	}),
];

exports.category_delete_get = asyncHandler(async (req, res, next) => {
	const [category, itemsInCategory] = await Promise.all([
		Category.findById(req.params.id).exec(),
		Items.find({ category: req.params.id }, "name").exec(),
	]);
	console.log(itemsInCategory);
	if (category === null) {
		res.redirect("/categories");
	}

	res.render("category_delete_form", {
		title: "Delete Form",
		category: category,
		items: itemsInCategory,
	});
});

exports.category_delete_post = asyncHandler(async (req, res, next) => {
	const [category, itemsInCategory] = await Promise.all([
		Category.findById(req.params.id).exec(),
		Items.find({ category: req.params.id }, "name").exec(),
	]);

	if (itemsInCategory.length > 0) {
		res.render("category_delete_form", {
			title: "Delete Form",
			category: category,
			items: itemsInCategory,
		});
		return;
	} else {
		await Category.findByIdAndDelete(req.body.categoryid);
		res.redirect("/categories");
	}
});

exports.category_update_get = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Category Update GET");
});

exports.category_update_post = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Category Update POST");
});
