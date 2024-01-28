import express from "express";
import {
  handleCreateNewUser,
  handleGetALlUsers,
  handleEditUser,
  handleDeleteUser,
  handleLoginUser,
  handleVerifyUser,
  handleChangePassword,
  handleRegisterUser,
} from "../controllers/userController";

import {
  handleCreateNewCategory,
  handleGetALlCategories,
  handleEditCategory,
  handleDeleteCategory,
} from "../controllers/categoryController";

import {
  handleCreateNewProduct,
  handleGetALlProducts,
  handleEditProduct,
  handleEditProductImage,
  handleDeleteProduct,
} from "../controllers/productController";

import {
  handleCreateNewProductComment,
  handleGetALlProductComments,
  handleEditProductComment,
  handleDeleteProductComment,
} from "../controllers/productCommentController";

import {
  handleCreateNewCart,
  handleGetALlCarts,
  handleGetALlCartsByUserId,
  handleEditCart,
  handleDeleteCart,
  handleDeleteCartByUserId,
} from "../controllers/cartController";

import {
  handleCreatePayment,
  handleReturnPayment,
} from "../controllers/paymentController";

import {
  handleCreateNewOrder,
  handleGetALlOrders,
  handleEditOrder,
  handleDeleteOrder,
} from "../controllers/orderController";

import {
  handleCreateNewOrderDetail,
  handleGetALlOrderDetails,
  handleEditOrderDetail,
  handleDeleteOrderDetail,
} from "../controllers/orderDetailController";

import {
  handleCreateNewFavoriteList,
  handleGetALlFavoriteLists,
  handleGetFavoriteListByUserId,
  handleEditFavoriteList,
  handleDeleteFavoriteList,
} from "../controllers/favoriteListController";

import {
  handleCreateNewPaymentAccount,
  handleGetALlPaymentAccount,
  handleEditPaymentAccount,
  handleGetPaymentAccountById,
  handleDeletePaymentAccount,
  handlePayment,
} from "../controllers/paymentAccountController";

const router = express.Router();
//--------------------------------------------------------

// console.log("check upload: ", upload);

let initAPIRoutes = (app) => {
  console.log(">>>check run api");
  router.post("/create-new-user", handleCreateNewUser);
  router.get("/get-all-users", handleGetALlUsers);
  router.put("/edit-user", handleEditUser);
  router.delete("/delete-user", handleDeleteUser);
  router.post("/login", handleLoginUser);
  router.post("/register", handleRegisterUser);
  router.post("/verify-user", handleVerifyUser);
  router.put("/change-password", handleChangePassword);

  router.post("/create-new-category", handleCreateNewCategory);
  router.get("/get-all-categories", handleGetALlCategories);
  router.put("/edit-category", handleEditCategory);
  router.delete("/delete-category", handleDeleteCategory);

  // router.post(
  //   "/create-new-product",
  //   upload.single("file"),
  //   handleCreateNewProduct
  // );
  router.post("/create-new-product", handleCreateNewProduct);
  router.get("/get-all-products", handleGetALlProducts);
  router.put("/edit-product", handleEditProduct);
  router.put("/edit-image-product", handleEditProductImage);
  router.delete("/delete-product", handleDeleteProduct);

  router.post("/create-new-product-comment", handleCreateNewProductComment);
  router.get("/get-all-product-comments", handleGetALlProductComments);
  router.put("/edit-product-comment", handleEditProductComment);
  router.delete("/delete-product-comment", handleDeleteProductComment);

  router.post("/create-new-cart", handleCreateNewCart);
  router.get("/get-all-carts", handleGetALlCarts);
  router.get("/get-all-carts-by-userId", handleGetALlCartsByUserId);
  router.put("/edit-cart", handleEditCart);
  router.delete("/delete-cart", handleDeleteCart);
  router.delete("/delete-cart-by-userId", handleDeleteCartByUserId);

  router.post("/create-payment", handleCreatePayment);
  router.get("/return-payment", handleReturnPayment);

  router.post("/create-new-order", handleCreateNewOrder);
  router.get("/get-all-orders", handleGetALlOrders);
  router.put("/edit-order", handleEditOrder);
  router.delete("/delete-order", handleDeleteOrder);

  router.post("/create-new-order-detail", handleCreateNewOrderDetail);
  router.get("/get-all-order-details", handleGetALlOrderDetails);
  router.put("/edit-order-detail", handleEditOrderDetail);
  router.delete("/delete-order-detail", handleDeleteOrderDetail);

  router.post("/create-new-favorite-list", handleCreateNewFavoriteList);
  router.get("/get-all-favorite-lists", handleGetALlFavoriteLists);
  router.get("/get-favorite-list-by-userId", handleGetFavoriteListByUserId);
  router.put("/edit-favorite-list", handleEditFavoriteList);
  router.delete("/delete-favorite-list", handleDeleteFavoriteList);

  router.post("/create-new-payment-account", handleCreateNewPaymentAccount);
  router.get("/get-all-payment-accounts", handleGetALlPaymentAccount);
  router.get("/get-payment-account-by-id", handleGetPaymentAccountById);
  router.put("/edit-payment-account", handleEditPaymentAccount);
  router.delete("/delete-payment-account", handleDeletePaymentAccount);
  router.post("/handle-payment", handlePayment);

  return app.use("/api/v1", router);
};

module.exports = initAPIRoutes;
