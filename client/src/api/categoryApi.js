import axios from "axios";
import { dataUrl } from "../share";

const createNewCategoryService = (data) => {
  return axios.post(`${dataUrl}/create-new-category`, data);
};

const getAllCategoriesService = () => {
  return axios.get(`${dataUrl}/get-all-categories`);
};

const editCategoryService = (data) => {
  return axios.put(`${dataUrl}/edit-category`, data);
};

const deleteCategoryService = (id) => {
  return axios.delete(`${dataUrl}/delete-category`, {
    data: {
      id: id,
    },
  });
};

export {
  createNewCategoryService,
  getAllCategoriesService,
  editCategoryService,
  deleteCategoryService,
};
