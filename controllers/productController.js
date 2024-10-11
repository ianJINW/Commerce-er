const db = require("../models");

module.exports = {
	createProduct: async (req, res) => {
		const { title, description, price, category } = req.body;
		const media = req.files;

		if (!media) {
			req.flash("error", "Product image required");
			return res.redirect("/api/product");
		}

		const images = req.files
			? req.files.map(file => `/uploads/product/${file.filename}`)
			: [];

		try {
			const product = await db.Product.create({
				title,
				price,
				description,
				category,
				images
			});

			req.flash("success", "Product created successfully");
			res.redirect("/api/product");
		} catch (error) {
			req.flash("error", "Product not created.");
			console.error(error);
			res.redirect("/api/product/create");
		}
	},

	getProducts: async (req, res) => {
		try {
			const products = await db.Product.findAll({});

			if (products) {
				req.flash("success", "Product retrieved successfully");
				return res.render("products", { products });
			}

			req.flash("error", "Product not found.");
			console.error(error);
			res.redirect("/api/product");
		} catch (error) {
			req.flash("error", "Product not found.");
			console.error(error);
			res.redirect("/api/product");
		}
	},

	getProductById: async (req, res) => {
		const { id } = req.params;

		if (!id) {
			req.flash("error", "Error finding product");
			return res.redirect("/api/product");
		}

		try {
			const product = await db.Product.findOne({ where: { id } });

			if (!product) {
				req.flash("error", "Product not found.");
				return res.redirect("/api/product");
			}

			req.flash("success", "Product retrieved successfully");
			res.render("product", { product });
		} catch (error) {
			req.flash("error", "Product not retrieved.");
			console.error(error);
			res.redirect("/api/product");
		}
	},

	updateProductById: async (req, res) => {
		const { id } = req.params;
		const { title, price, description, category } = req.body;

		const images = req.files
			? req.files.map(file => `/uploads/product/${file.filename}`)
			: [];

		const updates = {};

		if (title) updates.title = title;
		if (description) updates.description = description;
		if (price) updates.price = price;
		if (images) updates.images = images;
		if (category) updates.category = category;

		try {
			const product = await db.Product.update(updates, {
				where: { id }
			});

			req.flash("success", "Product updated successfully");
			console.log(product);
			res.redirect("/api/product");
		} catch (error) {
			req.flash("error", "Product not updated.");
			console.error(error);
			res.redirect(`/api/product/${id}`);
		}
	},

	deleteProduct: async (req, res) => {
		const { id } = req.params;

		if (!id) {
			req.flash("error", "Error finding product");
		}

		try {
			const product = await db.Product.destroy({
				where: { id }
			});

			req.flash("success", "Product deleted successfully");
			console.log(product);
			res.redirect("/api/product");
		} catch (error) {
			req.flash("error", "Product not deleted.");
			console.error(error);
			res.redirect("/api/product");
		}
	}
};
