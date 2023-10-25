import db from "../models/index";
import { Sequelize } from "sequelize";

const createNewCart = (data) => {
  const { userId, productId, quantity } = data;
  return new Promise(async (resolve, reject) => {
    try {
      if (!userId || !productId || !quantity) {
        resolve({
          errCode: 1,
          message: "Missing paremeter !",
        });
      }

      const result = await db.Cart.create({
        userId: userId,
        productId: productId,
        quantity: quantity,
      });

      if (result) {
        const cart = await db.Cart.findAll({
          include: [
            {
              model: db.Product,
            },
          ],
        });

        resolve({
          errCode: 0,
          message: "Create new cart successfully",
          cart,
        });
      } else {
        resolve({
          errCode: 6,
          message: "Server create cart error !",
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

const getALlCarts = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const cart = await db.Cart.findAll({
        include: [
          {
            model: db.Product,
          },
        ],
      }); // => array

      if (cart.length !== 0) {
        resolve({
          errCode: 0,
          message: "Get all carts successfully",
          cart,
        });
      } else {
        resolve({
          errCode: 3,
          message: "Cart not found !",
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

const getALlCartsByUserId = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const cart = await db.Cart.findAll({
        where: {
          userId: userId,
        },
        include: [
          {
            model: db.Product,
          },
        ],
      }); // => array

      if (cart.length !== 0) {
        resolve({
          errCode: 0,
          message: "Get all carts successfully",
          cart,
        });
      } else {
        resolve({
          errCode: 3,
          message: "Cart not found !",
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

const editCart = (data) => {
  const { id, userId, productId, quantity } = data;

  return new Promise(async (resolve, reject) => {
    try {
      if (!id || !quantity) {
        resolve({
          errCode: 1,
          message: "Missing paremeter !",
        });
      }

      const [numAffectedRows, updatedRows] = await db.Cart.update(
        {
          quantity: quantity,
        },
        {
          where: { id: id },
          returning: true,
          plain: true,
        }
      );

      if (updatedRows !== 0) {
        const cart = await db.Cart.findAll({
          include: [
            {
              model: db.Product,
            },
          ],
        });

        resolve({
          errCode: 0,
          message: "Cart has been updated",
          cart,
        });
      } else {
        resolve({
          errCode: 3,
          message: "Cart not found !",
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

const deleteCart = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          message: "Missing paremeter !",
        });
      }

      const result = await db.Cart.destroy({
        where: { id: id },
      });

      // console.log("check delete cart: ", result);
      if (result !== 0) {
        const cart = await db.Cart.findAll({
          include: [
            {
              model: db.Product,
            },
          ],
        });
        resolve({
          errCode: 0,
          message: "Cart has been deleted !",
          cart,
        });
      } else {
        resolve({
          errCode: 3,
          message: "Cart not found !",
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

const deleteCartByUserId = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!userId) {
        resolve({
          errCode: 1,
          message: "Missing paremeter !",
        });
      }

      const result = await db.Cart.destroy({
        where: { userId: userId },
      });

      // console.log("check delete cart: ", result);
      if (result !== 0) {
        const cart = await db.Cart.findAll({
          where: {
            userId: userId,
          },
          include: [
            {
              model: db.Product,
            },
          ],
        });
        resolve({
          errCode: 0,
          message: "Cart has been deleted !",
          cart,
        });
      } else {
        resolve({
          errCode: 3,
          message: "Cart not found !",
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
  createNewCart,
  getALlCarts,
  getALlCartsByUserId,
  editCart,
  deleteCart,
  deleteCartByUserId,
};
