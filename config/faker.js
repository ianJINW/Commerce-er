const { faker } = require("@faker-js/faker");
const db = require("../models");
const axios = require("axios");
const product = require("../models/product");

module.exports = {
	generateFakeProducts: async (req, res) => {
		const request = await axios.get("https://fakestoreapi.com/products");
		const response = request.data;

		console.log(response);

		try {
			const fakeProducts = response.map(product => ({
				title: product.title || faker.commerce.productName(), // Use API data if available
				description: product.description || faker.commerce.productDescription(),
				price: product.price || parseFloat(faker.commerce.price()),
				images: product.images || [
					faker.image.urlPlaceholder(300, 300, true),
					faker.image.urlPlaceholder(300, 300, true),
					faker.image.urlPlaceholder(300, 300, true),
					faker.image.urlPlaceholder(300, 300, true)
				],
				category: product.category || faker.commerce.department()
			}));

			for (const fakeProduct of fakeProducts) {
				console.log(fakeProduct);

				await db.Product.create(fakeProduct);
			}

			// Fetch all products from the database to confirm
			const products = await db.Product.findAll();
			console.log(products);

			req.flash("success", "Dummy info successfully created");
			res.redirect("/api/product");
		} catch (error) {
			console.error(error);
			req.flash("success", "Dummy info not successfully created");
			res.redirect("/api/generate");
		}
	}
};
