import db from "../models/index";

const createNewPaymentAccount = (data) => {
  const { userId, accountNumber, amount } = data;
  console.log(">>>chcek data payment account: ", data);
  return new Promise(async (resolve, reject) => {
    try {
      if (!userId || !accountNumber || !amount) {
        resolve({
          errCode: 1,
          message: "Missing paremeter !",
        });
      }

      const result = await db.PaymentAccount.create({
        userId: userId,
        accountNumber: accountNumber,
        amount: amount,
      });

      if (result) {
        const paymentAccount = await db.PaymentAccount.findAll();

        resolve({
          errCode: 0,
          message: "Create new paymentAccount successfully",
          paymentAccount,
        });
      } else {
        resolve({
          errCode: 6,
          message: "Server create paymentAccount error !",
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

const getALlPaymentAccounts = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const paymentAccount = await db.PaymentAccount.findAll();

      if (paymentAccount.length !== 0) {
        resolve({
          errCode: 0,
          message: "Get all PaymentAccount successfully",
          paymentAccount,
        });
      } else {
        resolve({
          errCode: 3,
          message: "PaymentAccount not found !",
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

const getPaymentAccountById = (data) => {
  const { id } = data;
  return new Promise(async (resolve, reject) => {
    try {
      const paymentAccount = await db.PaymentAccount.findOne({
        where: {
          id: id,
        },
      });

      if (paymentAccount) {
        resolve({
          errCode: 0,
          message: "Get PaymentAccount successfully",
          paymentAccount,
        });
      } else {
        resolve({
          errCode: 3,
          message: "PaymentAccount not found !",
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

const editPaymentAccount = (data) => {
  const { id, accountNumber, amount } = data;

  return new Promise(async (resolve, reject) => {
    try {
      if (!id || !accountNumber || !amount) {
        resolve({
          errCode: 1,
          message: "Missing paremeter !",
        });
      }

      const [numAffectedRows, updatedRows] = await db.PaymentAccount.update(
        {
          accountNumber: accountNumber,
          amount: amount,
        },
        {
          where: { id: id },
          returning: true,
          plain: true,
        }
      );

      if (updatedRows !== 0) {
        const paymentAccount = await db.PaymentAccount.findAll();

        resolve({
          errCode: 0,
          message: "PaymentAccount has been updated",
          paymentAccount,
        });
      } else {
        resolve({
          errCode: 3,
          message: "PaymentAccount not found !",
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

const deletePaymentAccount = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          message: "Missing paremeter !",
        });
      }

      const result = await db.PaymentAccount.destroy({
        where: { id: id },
      });

      if (result !== 0) {
        const paymentAccount = await db.PaymentAccount.findAll();
        resolve({
          errCode: 0,
          message: "PaymentAccount has been deleted !",
          paymentAccount,
        });
      } else {
        resolve({
          errCode: 3,
          message: "PaymentAccount not found !",
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

const payment = (data) => {
  const { userId, amount } = data;

  return new Promise(async (resolve, reject) => {
    try {
      const paymentAccount = await db.PaymentAccount.findOne({
        where: {
          userId: userId,
        },
      });

      if (paymentAccount.amount >= amount) {
        const [numAffectedRows, updatedRows] = await db.PaymentAccount.update(
          {
            amount: paymentAccount.amount - amount,
          },
          {
            where: { id: paymentAccount.id },
            returning: true,
            plain: true,
          }
        );
        resolve({
          errCode: 0,
          message: "Payment successfully !",
        });
      } else {
        resolve({
          errCode: 1,
          message: "Không đủ tiền",
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
  createNewPaymentAccount,
  getALlPaymentAccounts,
  editPaymentAccount,
  deletePaymentAccount,
  getPaymentAccountById,
  payment,
};
