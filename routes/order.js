const express = require("express");

const router = express.Router();
const orderController = require("../controllers/orderController");

router
	.route("/order")
	.get(orderController.getOrders)
	.post(orderController.createOrder);

router.route("/order/:id").get(orderController.getOrdersById);

module.exports = router;
