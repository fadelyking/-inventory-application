#! /usr/bin/env node

console.log(
	'This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

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

// We pass the index to the ...Create functions so that, for example,
// genre[0] will always be the Fantasy genre, regardless of the order
// in which the elements of promise.all's argument complete.
async function categoryCreate(index, name, description) {
	const category = new Category({ name: name, description: description });
	await category.save();
	category[index] = category;
	console.log(`Added category: ${name}`);
}

async function itemCreate(index, name, description, price, stock, isbn, _category) {
	const item = {
		name: name,
		description: description,
		price: price,
		stock: stock,
		isbn: isbn,
		_category: _category,
	};

	const itemobj = new Item(item);

	await itemobj.save();
	item[index] = item;
	console.log(`Added Item: ${item.name} ${item.price}`);
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
		itemCreate(
			0,
			"Rainbow Shoes",
			"Shoes that shoot rainbows",
			40,
			3,
			"9781473211896",
			categories[1]
		),
		itemCreate(1, "Crazy Hat", "Hat with a wild design", 23, 6, "9781473211896", categories[1]),
		itemCreate(
			2,
			"Glow-in-the-Dark Backpack",
			"Spacious backpack that glows in the dark",
			35,
			10,
			"9781541699891",
			categories[1]
		),
		itemCreate(
			3,
			"Invisible Umbrella",
			"An umbrella that shields you without blocking your view",
			50,
			5,
			"9780321125217",
			categories[2]
		),
		itemCreate(
			4,
			"Smartphone Projector",
			"Turn your smartphone into a portable cinema",
			28,
			8,
			"9781447285906",
			categories[1]
		),
		itemCreate(
			5,
			"Floating Plant Pot",
			"A gravity-defying pot that makes your plants levitate",
			45,
			7,
			"9780061120084",
			categories[2]
		),
		itemCreate(
			6,
			"Mood-Changing Candle",
			"Candle that changes color based on your mood",
			18,
			15,
			"9780141033570",
			categories[1]
		),
		itemCreate(
			7,
			"Virtual Reality Glasses",
			"Immersive VR experience for gaming and exploration",
			80,
			4,
			"9780380813810",
			categories[2]
		),
	]);
}
