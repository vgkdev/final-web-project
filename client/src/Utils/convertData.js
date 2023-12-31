import { Buffer } from "buffer";

export class ConvertImgToBase64 {
  static getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file.data);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
}

export const convertPrice = (price) => {
  return price.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
};

export const removeDiacritics = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

export const convertImageToBase64 = (buffer) => {
  // return new Promise((resolve, reject) => {
  //   try {
  //     // return new Buffer(buffer, "base64").toString("base64");
  //     resolve(new Buffer(buffer, "base64").toString("base64"));
  //   } catch (e) {
  //     reject(e);
  //   }
  // });
  return new Buffer(buffer, "base64").toString("base64");
};
