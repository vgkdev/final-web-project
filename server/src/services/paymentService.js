import db from "../models/index";
import { Sequelize } from "sequelize";
// const VnPay = require("vn-payments");
import { VNPay } from "vn-payments";

const vnpay = new VNPay({
  paymentGateway: "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html",
  merchant: "S6ANVFJP",
  secureSecret: "JNOGWVTOCUVPAKBWKWTPOIRQJRSVPVIJ",
  //   returnUrl: "http://localhost:3000/return",
  //   tmnCode: "S6ANVFJP",
});

const createPayment = (data) => {
  const { amount, orderId, orderInfo, clientIp } = data;
  //   console.log("check data: ", data);

  return new Promise(async (resolve, reject) => {
    try {
      const paymentUrl = await vnpay.buildCheckoutUrl({
        amount: parseInt(amount, 10),
        orderId,
        orderInfo,
        clientIp,
        returnUrl: "http://localhost:3000/payment-return",
        orderType: "MUAHANG",
        bankCode: "NCB",
        // vnpVersion: "2.0.1",

        transactionId: "abc123", // Mã giao dịch của bạn
        // ipAddr: "192.168.1.1", // Địa chỉ IP của khách hàng
        // language: "vn", // Ngôn ngữ của trang thanh toán (vn/en)
        // paymentMethod: "ATM", // Phương thức thanh toán (ATM/QRCode/VISA, ...)
        // customerId: "12345", // Mã khách hàng của bạn
        // customerName: "John Doe", // Tên khách hàng
        // customerPhone: "0123456789", // Số điện thoại khách hàng
        // customerEmail: "john.doe@example.com", // Địa chỉ email khách hàng
        // returnUrlTimeout: 600,
      });
      //   res.redirect(paymentUrl);
      console.log("check url: ", paymentUrl);
      resolve(paymentUrl);
    } catch (e) {
      console.log("Error: ", e);
      reject({
        errCode: 500,
        message: "Internal server error",
      });
    }
  });
};

const returnPayment = (data) => {
  const query = data;

  return new Promise(async (resolve, reject) => {
    try {
      const isValid = vnpay.verifySignature(query);

      console.log("check is valid: ", isValid);
      resolve(isValid);
      //   if (isValid) {
      //     if (query.vnp_ResponseCode === "00") {
      //       // Thanh toán thành công
      //       // Lưu thông tin thanh toán vào database
      //       // Redirect về trang cảm ơn
      //       res.redirect("/thankyou");
      //     } else {
      //       // Thanh toán thất bại
      //       // Redirect về trang thông báo lỗi
      //       res.redirect("/error");
      //     }
      //   } else {
      //     // Chữ ký không hợp lệ
      //     // Redirect về trang thông báo lỗi
      //     res.redirect("/error");
      //   }
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
  createPayment,
  returnPayment,
};
