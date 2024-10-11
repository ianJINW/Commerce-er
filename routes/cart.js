const express = require("express");

const router = express.Router();
const cartController = require("../controllers/cartController");
const auth = require("../middleware/auth");

router.use(auth);

router
	.route("/cart")
	.get(cartController.getCart)
	.post(cartController.AddToCart);

router.route("/cart/:id").delete(cartController.removeFromCart);

module.exports = router;
