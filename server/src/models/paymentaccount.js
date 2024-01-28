"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PaymentAccount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PaymentAccount.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  PaymentAccount.init(
    {
      userId: DataTypes.INTEGER,
      accountNumber: DataTypes.STRING,
      amount: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "PaymentAccount",
    }
  );
  return PaymentAccount;
};
