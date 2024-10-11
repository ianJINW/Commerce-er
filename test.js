const { Sequelize } = require("sequelize");
const db = require("./models");
const generate = require("./config/faker");

const sequelize = new Sequelize("postdb", "josh", "liljosha", {
	host: "localhost",
	dialect: "postgres"
});

async function testConnection() {
	try {
		await sequelize.authenticate();
		console.log("Connection has been established successfully.");

		(async () => {
			try {
				await generate.generateFakeProducts();

				const products = await db.Product.findAll();
				console.log(products);
			} catch (error) {
				console.error("Error fetching products:", error);
			}
		})();
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
}

testConnection();
