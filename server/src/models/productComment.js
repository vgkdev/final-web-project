"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductComment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductComment.belongsTo(models.User, { foreignKey: "userId" });
      ProductComment.belongsTo(models.Product, { foreignKey: "productId" });
    }
  }
  ProductComment.init(
    {
      userId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      commentContent: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "ProductComment",
    }
  );
  return ProductComment;
};
