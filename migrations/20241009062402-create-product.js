"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Products", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			title: {
				type: Sequelize.STRING,
				allowNull: false
			},
			price: {
				type: Sequelize.STRING,
				allowNull: false
			},
			description: {
				type: Sequelize.TEXT,
				allowNull: false
			},
			category: {
				type: Sequelize.JSON,
				allowNull: false
			},
			images: {
				type: Sequelize.JSON,
				allowNull: false
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Products");
	}
};
