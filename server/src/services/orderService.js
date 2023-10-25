import db from "../models/index";
import { Sequelize } from "sequelize";

const createNewOrder = (data) => {
  const { userId, status, totalPrice, cartData } = data;
  return new Promise(async (resolve, reject) => {
    try {
      if (!userId || !status || !totalPrice) {
        resolve({
          errCode: 1,
          message: "Missing paremeter !",
        });
      }

      const result = await db.Order.create({
        userId: userId,
        status: status,
        totalPrice: totalPrice,
      });

      if (result) {
        console.log(">>>check result create order: ", result.id);
        const order = await db.Order.findAll({
          include: [
            {
              model: db.User,
              attributes: { exclude: ["password"] },
            },
            {
              model: db.OrderDetail,
              include: [
                {
                  model: db.Product,
                },
              ],
            },
          ],
        });

        try {
          cartData.map(async (value, index) => {
            await db.OrderDetail.create({
              orderId: result.id,
              productId: value.productId,
              quantity: value.quantity,
            });
          });
        } catch (e) {
          console.log(e);
        }

        resolve({
          errCode: 0,
          message: "Create new order successfully",
          order,
        });
      } else {
        resolve({
          errCode: 6,
          message: "Server create order error !",
        });
      }
    } catch (e) {
      console.log("Error: ", e);
      reject({
        errCode: 500,
        message: "Internal server error",
      });
    }
  });
};

const getALlOrders = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const order = await db.Order.findAll({
        include: [
          {
            model: db.User,
            attributes: { exclude: ["password"] },
          },
          {
            model: db.OrderDetail,
            include: [
              {
                model: db.Product,
              },
            ],
          },
        ],
      }); // => array

      if (order.length !== 0) {
        resolve({
          errCode: 0,
          message: "Get all orders successfully",
          order,
        });
      } else {
        resolve({
          errCode: 3,
          message: "Order not found !",
        });
      }
    } catch (e) {
      console.log("Error: ", e);
      reject({
        errCode: 500,
        message: "Internal server error",
      });
    }
  });
};

const editOrder = (data) => {
  const { id, status } = data;

  return new Promise(async (resolve, reject) => {
    try {
      if (!id || !status) {
        resolve({
          errCode: 1,
          message: "Missing paremeter !",
        });
      }

      const [numAffectedRows, updatedRows] = await db.Order.update(
        {
          status: status,
        },
        {
          where: { id: id },
          returning: true,
          plain: true,
        }
      );

      if (updatedRows !== 0) {
        const order = await db.Order.findAll({
          include: [
            {
              model: db.User,
              attributes: { exclude: ["password"] },
            },
            {
              model: db.OrderDetail,
              include: [
                {
                  model: db.Product,
                },
              ],
            },
          ],
        });

        resolve({
          errCode: 0,
          message: "Order has been updated",
          order,
        });
      } else {
        resolve({
          errCode: 3,
          message: "Order not found !",
        });
      }
    } catch (e) {
      console.log("Error: ", e);
      reject({
        errCode: 500,
        message: "Internal server error",
      });
    }
  });
};

const deleteOrder = (id) => {
  console.log("check order id: ", id);
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          message: "Missing paremeter !",
        });
      }

      try {
        await db.OrderDetail.destroy({
          where: { orderId: id },
        });
      } catch (e) {
        console.log("Error: ", e);
        reject({
          errCode: 500,
          message: "Internal server error",
        });
      }
      const result = await db.Order.destroy({
        where: { id: id },
      });

      // console.log("check delete order: ", result);
      if (result !== 0) {
        const order = await db.Order.findAll({
          include: [
            {
              model: db.User,
              attributes: { exclude: ["password"] },
            },
            {
              model: db.OrderDetail,
              include: [
                {
                  model: db.Product,
                },
              ],
            },
          ],
        });
        resolve({
          errCode: 0,
          message: "Order has been deleted !",
          order,
        });
      } else {
        resolve({
          errCode: 3,
          message: "Order not found !",
        });
      }
    } catch (e) {
      console.log("Error: ", e);
      reject({
        errCode: 500,
        message: "Internal server error",
      });
    }
  });
};

module.exports = {
  createNewOrder,
  getALlOrders,
  editOrder,
  deleteOrder,
};
