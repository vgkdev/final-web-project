import axios from "axios";
import { dataUrl } from "../share";

const createNewProductCommentService = (data) => {
  return axios.post(`${dataUrl}/create-new-product-comment`, data);
};

const getAllProductCommentsService = () => {
  return axios.get(`${dataUrl}/get-all-product-comments`);
};

const editProductCommentService = (data) => {
  return axios.put(`${dataUrl}/edit-product-comment`, data);
};

const deleteProductCommentService = (id) => {
  return axios.delete(`${dataUrl}/delete-product-comment`, {
    data: {
      id: id,
    },
  });
};

export {
  createNewProductCommentService,
  getAllProductCommentsService,
  editProductCommentService,
  deleteProductCommentService,
};
