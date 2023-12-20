#! /usr/bin/env node

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Item = require("./models/items");
const Category = require("./models/category");

const items = [];
const categories = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
	console.log("Debug: About to connect");
	await mongoose.connect(mongoDB);
	console.log("Debug: Should be connected?");
	await createCategories();
	await createItems();
	console.log("Debug: Closing mongoose");
	mongoose.connection.close();
}

async function categoryCreate(index, name, description) {
	const category = new Category({ name: name, description: description });
	await category.save();
	categories[index] = category;
	console.log(`Added category: ${name}`);
}

async function itemCreate(index, name, description, category, price, stock) {
	const item = {
		name: name,
		description: description,
		category: category,
		price: price,
		stock: stock,
	};

	const itemobj = new Item(item);

	await itemobj.save();
	items[index] = item;
	console.log(`Added Item: ${item.category} ${item.price}`);
}

async function createCategories() {
	console.log("Adding Categories");
	await Promise.all([
		categoryCreate(0, "Foot Wear", "Shoes, sandals and boots!"),
		categoryCreate(1, "Head Wear", "Hats, caps and anything above!"),
		categoryCreate(2, "Winter", "Jackets!"),
	]);
}

async function createItems() {
	console.log("Adding Items");
	await Promise.all([
		itemCreate(1, "Crazy Hat", "Hat with a wild design", categories[0], 10, 55),
		itemCreate(1, "Crazy Shoe", "Shoe with a wild design", categories[2], 9.99, 3),
		itemCreate(1, "Crazy Jacket", "Jat with a wild design", categories[1], 9.99, 4),
	]);
}
