import axios from "axios";
import { dataUrl } from "../share";

const createNewProductService = (data) => {
  try {
    return axios.post(`${dataUrl}/create-new-product`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (e) {
    console.log("error api: ", e);
  }
};

const getAllProductsService = () => {
  return axios.get(`${dataUrl}/get-all-products`);
};

const editProductService = (data) => {
  return axios.put(`${dataUrl}/edit-product`, data);
};

const editProductImageService = (data) => {
  return axios.put(`${dataUrl}/edit-image-product`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const deleteProductService = (id) => {
  return axios.delete(`${dataUrl}/delete-product`, {
    data: {
      id: id,
    },
  });
};

export {
  createNewProductService,
  getAllProductsService,
  editProductService,
  editProductImageService,
  deleteProductService,
};
