import db from "../models/index";
import { Sequelize } from "sequelize";

const createNewFavoriteList = (data) => {
  const { userId, productId } = data;
  return new Promise(async (resolve, reject) => {
    try {
      if (!userId || !productId) {
        resolve({
          errCode: 1,
          message: "Missing paremeter !",
        });
      }

      const isExist = await db.FavoriteList.findOne({
        where: { productId: productId, userId: userId },
      });

      if (isExist) {
        resolve({
          errCode: 2,
          message: "Product existed !",
        });
      } else {
        const result = await db.FavoriteList.create({
          userId: userId,
          productId: productId,
        });

        if (result) {
          const favoriteList = await db.FavoriteList.findAll({
            include: [
              {
                model: db.User,
                attributes: { exclude: ["password"] },
              },
              {
                model: db.Product,
              },
            ],
          });

          resolve({
            errCode: 0,
            message: "Create new favoriteList successfully",
            favoriteList,
          });
        } else {
          resolve({
            errCode: 6,
            message: "Server create favoriteList error !",
          });
        }
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

const getALlFavoriteLists = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const favoriteList = await db.FavoriteList.findAll({
        include: [
          {
            model: db.User,
            attributes: { exclude: ["password"] },
          },
          {
            model: db.Product,
          },
        ],
      }); // => array

      if (favoriteList.length !== 0) {
        resolve({
          errCode: 0,
          message: "Get all favoriteLists successfully",
          favoriteList,
        });
      } else {
        resolve({
          errCode: 3,
          message: "FavoriteList not found !",
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

const getFavoriteListByUserId = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const favoriteList = await db.FavoriteList.findAll({
        where: { userId: userId },
        include: [
          {
            model: db.User,
            attributes: { exclude: ["password"] },
          },
          {
            model: db.Product,
          },
        ],
      });

      if (favoriteList.length !== 0) {
        resolve({
          errCode: 0,
          message: "Get favoriteLists successfully",
          favoriteList,
        });
      } else {
        resolve({
          errCode: 3,
          message: "FavoriteList not found !",
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

const editFavoriteList = (data) => {
  const { id, userId, productId } = data;

  return new Promise(async (resolve, reject) => {
    try {
      if (!id || !userId || !productId) {
        resolve({
          errCode: 1,
          message: "Missing paremeter !",
        });
      }

      const [numAffectedRows, updatedRows] = await db.FavoriteList.update(
        {
          userId: userId,
          productId: productId,
        },
        {
          where: { id: id },
          returning: true,
          plain: true,
        }
      );

      if (updatedRows !== 0) {
        const favoriteList = await db.FavoriteList.findAll({
          include: [
            {
              model: db.User,
              attributes: { exclude: ["password"] },
            },
            {
              model: db.Product,
            },
          ],
        });

        resolve({
          errCode: 0,
          message: "FavoriteList has been updated",
          favoriteList,
        });
      } else {
        resolve({
          errCode: 3,
          message: "FavoriteList not found !",
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

const deleteFavoriteList = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          message: "Missing paremeter !",
        });
      }

      const result = await db.FavoriteList.destroy({
        where: { productId: id },
      });

      // console.log("check delete favoriteList: ", result);
      if (result !== 0) {
        const favoriteList = await db.FavoriteList.findAll({
          include: [
            {
              model: db.User,
              attributes: { exclude: ["password"] },
            },
            {
              model: db.Product,
            },
          ],
        });
        resolve({
          errCode: 0,
          message: "FavoriteList has been deleted !",
          favoriteList,
        });
      } else {
        resolve({
          errCode: 3,
          message: "FavoriteList not found !",
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
  createNewFavoriteList,
  getALlFavoriteLists,
  getFavoriteListByUserId,
  editFavoriteList,
  deleteFavoriteList,
};
