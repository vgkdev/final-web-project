import db from "../models/index";
import { Sequelize } from "sequelize";

const createNewProductComment = (data) => {
  const { userId, productId, commentContent } = data;
  return new Promise(async (resolve, reject) => {
    try {
      if (!userId || !productId || !commentContent) {
        resolve({
          errCode: 1,
          message: "Missing paremeter !",
        });
      }

      const result = await db.ProductComment.create({
        userId: userId,
        productId: productId,
        commentContent: commentContent,
      });

      if (result) {
        const productComment = await db.ProductComment.findAll({
          include: [
            {
              model: db.User,
              attributes: ["firstName", "lastName"],
            },
          ],
        });

        resolve({
          errCode: 0,
          message: "Create new productComment successfully",
          productComment,
        });
      } else {
        resolve({
          errCode: 6,
          message: "Server create productComment error !",
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

const getALlProductComments = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const productComment = await db.ProductComment.findAll({
        include: [
          {
            model: db.User,
            attributes: ["firstName", "lastName"],
          },
        ],
      }); // => array

      if (productComment.length !== 0) {
        resolve({
          errCode: 0,
          message: "Get all productComments successfully",
          productComment,
        });
      } else {
        resolve({
          errCode: 3,
          message: "ProductComment not found !",
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

const editProductComment = (data) => {
  const { id, userId, productId, commentContent } = data;

  return new Promise(async (resolve, reject) => {
    try {
      if (!id || !userId || !productId || !commentContent) {
        resolve({
          errCode: 1,
          message: "Missing paremeter !",
        });
      }

      const [numAffectedRows, updatedRows] = await db.ProductComment.update(
        {
          commentContent: commentContent,
        },
        {
          where: { id: id },
          returning: true,
          plain: true,
        }
      );

      if (updatedRows !== 0) {
        const productComment = await db.ProductComment.findAll({
          include: [
            {
              model: db.User,
              attributes: ["firstName", "lastName"],
            },
          ],
        });

        resolve({
          errCode: 0,
          message: "ProductComment has been updated",
          productComment,
        });
      } else {
        resolve({
          errCode: 3,
          message: "ProductComment not found !",
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

const deleteProductComment = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          message: "Missing paremeter !",
        });
      }

      const result = await db.ProductComment.destroy({
        where: { id: id },
      });

      // console.log("check delete productComment: ", result);
      if (result !== 0) {
        const productComment = await db.ProductComment.findAll({
          include: [
            {
              model: db.User,
              attributes: ["firstName", "lastName"],
            },
          ],
        });
        resolve({
          errCode: 0,
          message: "ProductComment has been deleted !",
          productComment,
        });
      } else {
        resolve({
          errCode: 3,
          message: "ProductComment not found !",
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
  createNewProductComment,
  getALlProductComments,
  editProductComment,
  deleteProductComment,
};
