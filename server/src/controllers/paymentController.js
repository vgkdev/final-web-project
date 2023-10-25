import { createPayment, returnPayment } from "../services/paymentService";
import { VNPay } from "vn-payments";
require("dotenv").config();
const querystring = require("qs");
const crypto = require("crypto");
import { Buffer } from "buffer";

// function sortObject(obj) {
//   var keys = Object.keys(obj).sort();
//   var sortedObj = {};
//   for (var i in keys) {
//     sortedObj[keys[i]] = obj[keys[i]];
//   }
//   return sortedObj;
// }

// const handleCreatePayment = (req, res) => {
//   // var ipAddr =
//   //   req.headers["x-forwarded-for"] ||
//   //   req.connection.remoteAddress ||
//   //   req.socket.remoteAddress ||
//   //   req.connection.socket.remoteAddress;
//   var ipAddr = "127.0.0.1::1";

//   var tmnCode = process.env.VNP_TMNCODE;
//   var secretKey = process.env.VNP_HASHSECRET;
//   var vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
//   var returnUrl = process.env.RETURN_URL;

//   var date = new Date();

//   const createDate = req.body.createDate;
//   const orderId = req.body.orderId;
//   var amount = req.body.amount;
//   var bankCode = "";

//   var orderInfo = req.body.orderInfo;
//   var orderType = "210000";
//   var locale = "vn";
//   if (locale === null || locale === "") {
//     locale = "vn";
//   }
//   var currCode = "VND";
//   var vnp_Params = {};
//   vnp_Params["vnp_Version"] = "2.1.0";
//   vnp_Params["vnp_Command"] = "pay";
//   vnp_Params["vnp_TmnCode"] = tmnCode;
//   // vnp_Params['vnp_Merchant'] = ''
//   vnp_Params["vnp_Locale"] = locale;
//   vnp_Params["vnp_CurrCode"] = currCode;
//   vnp_Params["vnp_TxnRef"] = orderId;
//   vnp_Params["vnp_OrderInfo"] = orderInfo;
//   vnp_Params["vnp_OrderType"] = orderType;
//   vnp_Params["vnp_Amount"] = amount * 100;
//   vnp_Params["vnp_ReturnUrl"] = returnUrl;
//   vnp_Params["vnp_IpAddr"] = ipAddr;
//   vnp_Params["vnp_CreateDate"] = createDate;
//   if (bankCode !== null && bankCode !== "") {
//     vnp_Params["vnp_BankCode"] = bankCode;
//   }

//   vnp_Params = sortObject(vnp_Params);

//   var querystring = require("qs");
//   var signData = querystring.stringify(vnp_Params, { encode: false });
//   var crypto = require("crypto");
//   var hmac = crypto.createHmac("sha512", secretKey);
//   var signed = hmac.update(new Buffer.from(signData, "utf-8")).digest("hex");
//   vnp_Params["vnp_SecureHash"] = signed;
//   vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });

//   // res.redirect(vnpUrl);
//   console.log("check data: ", vnp_Params);
//   res.send({ vnpUrl });
// };

// const handleReturnPayment = (req, res) => {
//   var vnp_Params = req.query;

//   var secureHash = vnp_Params["vnp_SecureHash"];

//   delete vnp_Params["vnp_SecureHash"];
//   delete vnp_Params["vnp_SecureHashType"];

//   vnp_Params = sortObject(vnp_Params);

//   var tmnCode = process.env.VNP_TMNCODE;
//   var secretKey = process.env.VNP_HASHSECRET;

//   var signData = querystring.stringify(vnp_Params, { encode: false });
//   var hmac = crypto.createHmac("sha512", secretKey);
//   var signed = hmac.update(new Buffer.from(signData, "utf-8")).digest("hex");

//   if (secureHash === signed) {
//     //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua

//     res.send({ code: vnp_Params["vnp_ResponseCode"] });
//   } else {
//     res.send({ code: "97" });
//   }
// };

// VNPay.TEST_CONFIG = {
//   paymentGateway: "http://sandbox.vnpayment.vn/paymentv2/vpcpay.html",
//   merchant: "COCOSIN",
//   secureSecret: "RAOEXHYVSDDIIENYWSLDIIZTANXUXZFJ",
// };

const vnpay = new VNPay({
  paymentGateway: "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html",
  merchant: "S6ANVFJP",
  secureSecret: "JNOGWVTOCUVPAKBWKWTPOIRQJRSVPVIJ",
});

const handleCreatePayment = (req, res) => {
  // console.log("check data: ", req.body);
  const checkoutData = {
    amount: parseInt(req.body.amount, 10),
    orderInfo: req.body.orderInfo,
    orderId: req.body.orderId,
    orderType: "210000",
    clientIp: req.body.clientIp,
    // orderId: req.body.orderId,
    returnUrl: process.env.RETURN_URL,
    transactionId: req.body.transactionId, //mã giao dịch trong ngày
    bankCode: "NCB",

    // locale: "vn",
    // currency: "VND",
    // paymentMethod: "ATM_ONLINE",
    // description: "Mua mỹ phẩm trên website của chúng tôi",
    // installment: false,
  };
  vnpay.buildCheckoutUrl(checkoutData).then((checkoutUrl) => {
    res.send({ checkoutUrl });
  });
};

const handleReturnPayment = (req, res) => {
  const query = req.query;
  console.log("check query: ", query);
  vnpay.verifyReturnUrl(query).then((results) => {
    if (results) {
      // Lưu thông tin đơn hàng vào cơ sở dữ liệu của bạn ở đây
      res.redirect("http://localhost:3000/payment/success");
    } else {
      res.redirect("http://localhost:3000/payment/cancel");
    }
  });
};

module.exports = {
  handleCreatePayment,
  handleReturnPayment,
};
