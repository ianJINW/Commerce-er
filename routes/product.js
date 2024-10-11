const express = require("express");

const router = express.Router();
const productController = require("../controllers/productController");
const { uploadProduct } = require("../config/multer");
const generate = require("../config/faker");
const auth = require("../middleware/auth");

router
	.route("/product")
	.get(productController.getProducts)
	.post(uploadProduct.array("product", 10), productController.createProduct);

router.use(auth);

router
	.route("/product/:id")
	.get(productController.getProductById)
	.patch(productController.updateProductById)
	.delete(productController.deleteProduct);

router.route("/generate").get(generate.generateFakeProducts);

router.route("/create").get((req, res) => {
	res.render("create");
});

module.exports = router;
