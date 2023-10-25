import db from "../models/index";
import { Sequelize } from "sequelize";

const createNewCategory = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.categoryName) {
        resolve({
          errCode: 1,
          message: "Missing paremeter !",
        });
      }

      const isExist = await db.Category.findOne({
        where: { categoryName: data.categoryName },
      });

      //   console.log("check is exist: ", isExist);
      if (isExist) {
        resolve({
          errCode: 2,
          message: "Category existed !",
        });
      } else {
        const result = await db.Category.create({
          categoryName: data.categoryName,
        });

        if (result) {
          const category = await db.Category.findAll({
            attributes: [
              "id",
              "categoryName",
              [
                Sequelize.fn("count", Sequelize.col("Products.categoryId")),
                "productCount",
              ],
            ],
            include: [
              {
                model: db.Product,
                attributes: [],
              },
            ],
            group: ["Category.id"],
          });
          resolve({
            errCode: 0,
            message: "Create new category successfully",
            category,
          });
        } else {
          resolve({
            errCode: 6,
            message: "Server create category error !",
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

const getALlCategories = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const category = await db.Category.findAll({
        include: [
          {
            model: db.Product,
            attributes: [
              [
                Sequelize.fn("COUNT", Sequelize.col("categoryId")),
                "productCount",
              ],
            ],
          },
        ],
        // attributes: [
        //   "id",
        //   "categoryName",
        //   [
        //     Sequelize.fn("count", Sequelize.col("Products.categoryId")),
        //     "productCount",
        //   ],
        // ],
        // include: [
        //   {
        //     model: db.Product,
        //     attributes: [],
        //   },
        // ],
        include: {
          model: db.Product,
          where: { categoryId: Sequelize.col("Category.id") },
          // attributes: [
          //   "id",
          //   "categoryId",
          //   "productName",
          //   "quantity",
          //   "description",
          //   "imageUrl",
          //   "price",
          // ],
          required: false,
        },
        // group: ["Category.id"],
      }); // => array

      if (category.length !== 0) {
        resolve({
          errCode: 0,
          message: "Get all categories successfully",
          category,
        });
      } else {
        resolve({
          errCode: 3,
          message: "Category not found !",
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

const editCategory = (data) => {
  console.log("check data edit: ", data);
  return new Promise(async (resolve, reject) => {
    try {
      if (!(data.categoryName && data.newCategoryName && data.id)) {
        resolve({
          errCode: 1,
          message: "Missing paremeter !",
        });
      }

      const isExist = await db.Category.findOne({
        where: { categoryName: data.newCategoryName },
      });

      if (isExist) {
        resolve({
          errCode: 2,
          message: "Category existed !",
        });
      } else {
        const [numAffectedRows, updatedRows] = await db.Category.update(
          {
            categoryName: data.newCategoryName,
          },
          {
            where: { id: data.id },
            returning: true,
            plain: true,
          }
        );

        if (updatedRows !== 0) {
          const category = await db.Category.findAll({
            attributes: [
              "id",
              "categoryName",
              [
                Sequelize.fn("count", Sequelize.col("Products.categoryId")),
                "productCount",
              ],
            ],
            include: [
              {
                model: db.Product,
                attributes: [],
              },
            ],
            group: ["Category.id"],
          });

          resolve({
            errCode: 0,
            message: "Category has been updated",
            category,
          });
        } else {
          resolve({
            errCode: 3,
            message: "Category not found !",
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

const deleteCategory = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          message: "Missing paremeter !",
        });
      }

      const result = await db.Category.destroy({
        where: { id: id },
      });

      // console.log("check delete category: ", result);
      if (result !== 0) {
        const category = await db.Category.findAll({
          attributes: [
            "id",
            "categoryName",
            [
              Sequelize.fn("count", Sequelize.col("Products.categoryId")),
              "productCount",
            ],
          ],
          include: [
            {
              model: db.Product,
              attributes: [],
            },
          ],
          group: ["Category.id"],
        });
        resolve({
          errCode: 0,
          message: "Category has been deleted !",
          category,
        });
      } else {
        resolve({
          errCode: 3,
          message: "Category not found !",
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
  createNewCategory,
  getALlCategories,
  editCategory,
  deleteCategory,
};
