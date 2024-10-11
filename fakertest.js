const { faker } = require("@faker-js/faker");

const casual = require("casual");

const product = {
	name: casual.title,
	description: casual.sentences(2),
	price: casual.double(1, 100),
	sku: casual.uuid,
	category: casual.random_element(["Electronics", "Clothing", "Food"])
};

console.log(product);

function generateProductData() {
	const product = {
		name: faker.commerce.productName(),
		description: faker.commerce.productDescription(),
		price: parseFloat(faker.commerce.price()),
		category: faker.commerce.department(),
		quantity: faker.number.int({ min: 1, max: 100 }),
		/* 		manufacturer: faker.company.company(),
 */ createdAt: faker.date.past(),
		expirationDate: faker.date.future()
	};

	return product;
}

const productData = generateProductData();
console.log(productData);
