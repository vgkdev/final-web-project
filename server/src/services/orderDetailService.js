import db from "../models/index";
import { Sequelize } from "sequelize";

const createNewOrderDetail = (data) => {
  const { orderId, productId, quantity } = data;
  return new Promise(async (resolve, reject) => {
    try {
      if (!orderId || !productId || !quantity) {
        resolve({
          errCode: 1,
          message: "Missing paremeter !",
        });
      }

      const result = await db.OrderDetail.create({
        orderId: orderId,
        productId: productId,
        quantity: quantity,
      });

      if (result) {
        const orderDetail = await db.OrderDetail.findAll({
          // include: [
          //   {
          //     model: db.User,
          //     attributes: ["firstName", "lastName"],
          //   },
          // ],
        });

        resolve({
          errCode: 0,
          message: "Create new orderDetail successfully",
          orderDetail,
        });
      } else {
        resolve({
          errCode: 6,
          message: "Server create orderDetail error !",
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

const getALlOrderDetails = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const orderDetail = await db.OrderDetail.findAll({
        // include: [
        //   {
        //     model: db.User,
        //     attributes: ["firstName", "lastName"],
        //   },
        // ],
      }); // => array

      if (orderDetail.length !== 0) {
        resolve({
          errCode: 0,
          message: "Get all orderDetails successfully",
          orderDetail,
        });
      } else {
        resolve({
          errCode: 3,
          message: "OrderDetail not found !",
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

const editOrderDetail = (data) => {
  const { id, orderId, productId, quantity } = data;

  return new Promise(async (resolve, reject) => {
    try {
      if (!id || !orderId || !productId || !quantity) {
        resolve({
          errCode: 1,
          message: "Missing paremeter !",
        });
      }

      const [numAffectedRows, updatedRows] = await db.OrderDetail.update(
        {
          orderId: orderId,
          productId: productId,
          quantity: quantity,
        },
        {
          where: { id: id },
          returning: true,
          plain: true,
        }
      );

      if (updatedRows !== 0) {
        const orderDetail = await db.OrderDetail.findAll({
          // include: [
          //   {
          //     model: db.User,
          //     attributes: ["firstName", "lastName"],
          //   },
          // ],
        });

        resolve({
          errCode: 0,
          message: "OrderDetail has been updated",
          orderDetail,
        });
      } else {
        resolve({
          errCode: 3,
          message: "OrderDetail not found !",
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

const deleteOrderDetail = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          message: "Missing paremeter !",
        });
      }

      const result = await db.OrderDetail.destroy({
        where: { id: id },
      });

      // console.log("check delete orderDetail: ", result);
      if (result !== 0) {
        const orderDetail = await db.OrderDetail.findAll({
          // include: [
          //   {
          //     model: db.User,
          //     attributes: ["firstName", "lastName"],
          //   },
          // ],
        });
        resolve({
          errCode: 0,
          message: "OrderDetail has been deleted !",
          orderDetail,
        });
      } else {
        resolve({
          errCode: 3,
          message: "OrderDetail not found !",
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
  createNewOrderDetail,
  getALlOrderDetails,
  editOrderDetail,
  deleteOrderDetail,
};
