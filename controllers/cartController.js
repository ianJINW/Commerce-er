const db = require("../models");

module.exports = {
	AddToCart: async (req, res) => {
		const { userId, productId, quantity } = req.body;
		console.log(req.body);
		let it;

		try {
			const item = await db.Cart.findOne({
				where: { userId: req.user.id, productId }
			});

			if (item) {
				item.quantity += parseInt(quantity, 10);
				await item.save();
			} else {
				it = await db.Cart.create({
					userId,
					productId,
					quantity: parseInt(quantity, 10)
				});
			}

			req.flash("success", "Added to cart sucessfully");
			console.log(it);

			res.redirect("/api/cart");
		} catch (error) {
			req.flash("error", "Not added to cart yet");
			console.error(error);
			res.redirect("/api/product");
		}
	},
	getCart: async (req, res) => {
		try {
			const cart = await db.Cart.findAll({
				where: { userId: req.user.id },
				include: [{ model: db.Product, as: "product" }]
			});

			req.flash("success", "Retrieving successful");
			console.log(cart);

			res.render("cart", { cart });
		} catch (error) {
			req.flash("error", "Retrieving unsuccessful");
			console.error(error);
			res.redirect("/api/product");
		}
	},
	removeFromCart: async (req, res) => {
		const { id } = req.params;

		try {
			await db.Cart.destroy({ where: { userId: req.user.id, productId: id } });

			req.flash("success", "Removed successfully");
			res.redirect("/api/cart");
		} catch (error) {
			req.flash("error", "Retrieving unsuccessful");
			console.error(error);
			res.redirect("/api/cart");
		}
	}
};
