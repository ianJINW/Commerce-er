"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Order extends Model {
		/**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
		static associate(models) {
			// define association here
			Order.belongsTo(models.User, { foreignKey: "userId", as: "user" });
			Order.belongsToMany(models.Product, {
				through: "OrderProduct",
				foreignKey: "orderId",
				as: "products"
			});
		}
	}
	Order.init(
		{
			userId: DataTypes.INTEGER,
			productId: DataTypes.ARRAY(DataTypes.INTEGER),
			quantity: DataTypes.ARRAY(DataTypes.INTEGER),
			total: DataTypes.DECIMAL,
			status: {
				type: DataTypes.STRING,
				defaultValue: "Pending"
			}
		},
		{
			sequelize,
			modelName: "Order"
		}
	);
	return Order;
};
