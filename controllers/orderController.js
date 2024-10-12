const db = require("../models");

module.exports = {
	createOrder: async (req, res) => {
		const { userId, productId, quantity, total } = req.body;

		try {
			const order = await db.Order.create({
				userId,
				productId: Array.isArray(productId) ? productId : [productId],
				quantity,
				total
			});

			req.flash("success", "Order submitted successfully.");
			console.log(order, "order");

			await db.Cart.destroy({
				where: { userId }
			});

			res.redirect("/api/order");
		} catch (error) {
			req.flash("error", "Order not submitted");
			console.log(error);
			res.redirect("/api/cart");
		}
	},
	getOrders: async (req, res) => {
		try {
			const orders = await db.Order.findAll({
				where: { userId: req.user.id }
			});

			req.flash("success", "Orders retrieved successfully.");
			res.render("orders", { orders });
		} catch (error) {
			req.flash("error", "Orders not retrieved");
			console.error("Error retrieving orders:", error);
			res.redirect("/api/product");
		}
	},
	getOrdersById: async (req, res) => {
		const { id } = req.params;

		try {
			const order = await db.Order.findOne({
				where: { id },
				include: [
					{ model: db.User, as: "user" },
					{
						model: db.Product,
						as: "products",
						through: { attributes: ["quantity"] }
					}
				]
			});

			console.log(order);

			if (!order) {
				req.flash("error", "Order not found.");
				return res.redirect("/api/order");
			}

			req.flash("success", "Orders retrieved successfully.");
			res.render("order", { order });
		} catch (error) {
			req.flash("error", "Order not retrieved");
			console.error("Error retrieving orders:", error);
			res.redirect("/api/order");
		}
	}
};
