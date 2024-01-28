import db from "../models/index";
import bcrypt from "bcryptjs";

import {
  createNewPaymentAccount,
  getALlPaymentAccounts,
  editPaymentAccount,
  getPaymentAccountById,
  deletePaymentAccount,
} from "./paymentAccountService";

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (password) => {
  return new Promise((resolve, reject) => {
    try {
      const hashPassword = bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      console.log("Error: ", e);
      reject({
        errCode: 500,
        message: "Internal server error",
      });
    }
  });
};

const userExist = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({
        where: {
          email: email,
        },
      });

      if (user) {
        resolve(true);
      } else {
        resolve(false);
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

const createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !(
          data.email &&
          data.password &&
          data.firstName &&
          data.lastName &&
          data.address &&
          data.phoneNumber
        )
      ) {
        resolve({
          errCode: 1,
          message: "Missing paremeter !",
        });
      }

      const isExist = await userExist(data.email);
      if (isExist === true) {
        resolve({
          errCode: 2,
          message: "User existed !",
        });
      } else {
        const hashPassword = await hashUserPassword(data.password);

        const response = await db.User.create({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: hashPassword,
          address: data.address,
          phoneNumber: data.phoneNumber,
        });

        if (response) {
          const user = await db.User.findAll({
            attributes: { exclude: ["password"] },
          });
          resolve({
            errCode: 0,
            message: "Create new user successfully",
            user,
          });
        } else {
          resolve({
            errCode: 6,
            message: "Error create new user !",
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

const registerUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !(
          data.email &&
          data.password &&
          data.firstName &&
          data.lastName &&
          data.address &&
          data.phoneNumber &&
          data.accountNumber
        )
      ) {
        resolve({
          errCode: 1,
          message: "Missing paremeter !",
        });
      }

      const isExist = await userExist(data.email);
      if (isExist === true) {
        resolve({
          errCode: 2,
          message: "User existed !",
        });
      } else {
        const hashPassword = await hashUserPassword(data.password);

        const response = await db.User.create({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: hashPassword,
          address: data.address,
          phoneNumber: data.phoneNumber,
        });

        if (response) {
          await createNewPaymentAccount({
            userId: response.id,
            accountNumber: data.accountNumber,
            amount: 100000000,
          });

          resolve({
            errCode: 0,
            message: "Create new user successfully",
            user: response,
          });
        } else {
          resolve({
            errCode: 6,
            message: "Error create new user !",
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

const getALlUsers = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findAll({
        attributes: { exclude: ["password"] },
      }); // => array

      if (user.length !== 0) {
        resolve({
          errCode: 0,
          message: "Get all user successfully",
          user,
        });
      } else {
        resolve({
          errCode: 3,
          message: "User not found !",
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

const editUser = (data) => {
  const { id, firstName, lastName, email, newEmail, address, phoneNumber } =
    data;
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !(
          id &&
          firstName &&
          lastName &&
          email &&
          newEmail &&
          address &&
          phoneNumber
        )
      ) {
        resolve({
          errCode: 1,
          message: "Missing paremeter !",
        });
      }

      const isExist = await userExist(newEmail);
      // console.log("check eixist: ", isExist);
      if (isExist === true && email !== newEmail) {
        resolve({
          errCode: 2,
          message: "User existed !",
        });
      } else {
        const [numAffectedRows, updatedRows] = await db.User.update(
          {
            firstName: firstName,
            lastName: lastName,
            email: newEmail,
            address: address,
            phoneNumber: phoneNumber,
          },
          {
            where: { id: id },
            returning: true,
            plain: true,
          }
        );

        // console.log("check updated rows: ", updatedRows);

        if (updatedRows !== 0) {
          const user = await db.User.findAll({
            attributes: { exclude: ["password"] },
          });

          resolve({
            errCode: 0,
            message: "User has been updated",
            user,
          });
        } else {
          resolve({
            errCode: 3,
            message: "User not found !",
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

const deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          message: "Missing paremeter !",
        });
      }

      const result = await db.User.destroy({
        where: { id: id },
      });

      // console.log("check delete user: ", result);

      if (result !== 0) {
        const user = await db.User.findAll({
          attributes: { exclude: ["password"] },
        });
        resolve({
          errCode: 0,
          message: "User has been deleted !",
          user,
        });
      } else {
        resolve({
          errCode: 3,
          message: "User not found !",
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

const loginUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!(data.email && data.password)) {
        resolve({
          errCode: 1,
          message: "Missing paremeter !",
        });
      }

      const isExist = await userExist(data.email);

      if (isExist) {
        const user = await db.User.findOne({
          where: { email: data.email },
        });

        if (user) {
          const checkPassword = bcrypt.compareSync(
            data.password,
            user.password
          );

          if (checkPassword) {
            resolve({
              errCode: 0,
              message: "Login successfully",
              user,
            });
          } else {
            resolve({
              errCode: 4,
              message: "Wrong password !",
            });
          }
        } else {
          resolve({
            errCode: 3,
            message: "User not found !",
          });
        }
      } else {
        resolve({
          errCode: 5,
          message: "Your email is not exist !",
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

const verifyUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!(data.email && data.password)) {
        resolve({
          errCode: 1,
          message: "Missing paremeter !",
        });
      }

      const user = await db.User.findOne({
        where: { email: data.email, password: data.password },
      });

      if (user) {
        resolve({
          errCode: 0,
          message: "Verify successful",
          user,
        });
      } else {
        resolve({
          errCode: 3,
          message: "User not found !",
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

const changePassword = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!(data.id && data.password && data.newPassword)) {
        resolve({
          errCode: 1,
          message: "Missing paremeter !",
        });
      }

      const user = await db.User.findOne({
        where: { id: data.id },
      });

      if (user) {
        const checkPassword = bcrypt.compareSync(data.password, user.password);

        if (checkPassword) {
          const hashPassword = await hashUserPassword(data.newPassword);

          const [numAffectedRows, updatedRows] = await db.User.update(
            {
              password: hashPassword,
            },
            {
              where: { id: data.id },
              returning: true,
              plain: true,
            }
          );

          if (updatedRows !== 0) {
            const user = await db.User.findOne({
              where: { id: data.id },
            });

            resolve({
              errCode: 0,
              message: "Password has been updated",
              user,
            });
          } else {
            resolve({
              errCode: 3,
              message: "User not found !",
            });
          }
        } else {
          resolve({
            errCode: 4,
            message: "Wrong password",
          });
        }
      } else {
        resolve({
          errCode: 3,
          message: "User not found !",
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
  createNewUser,
  getALlUsers,
  editUser,
  deleteUser,
  loginUser,
  verifyUser,
  changePassword,
  registerUser,
};
