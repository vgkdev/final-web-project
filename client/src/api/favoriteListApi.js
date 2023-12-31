import axios from "axios";
import { dataUrl } from "../share";

const createNewFavoriteListService = (data) => {
  return axios.post(`${dataUrl}/create-new-favorite-list`, data);
};

const getAllFavoriteListsService = () => {
  return axios.get(`${dataUrl}/get-all-favorite-lists`);
};

const getFavoriteListByUserIdService = (userId) => {
  return axios.get(`${dataUrl}/get-favorite-list-by-userId`, {
    params: {
      userId: userId,
    },
  });
};

const editFavoriteListService = (data) => {
  return axios.put(`${dataUrl}/edit-favorite-list`, data);
};

const deleteFavoriteListService = (id) => {
  return axios.delete(`${dataUrl}/delete-favorite-list`, {
    data: {
      id: id,
    },
  });
};

export {
  createNewFavoriteListService,
  getAllFavoriteListsService,
  getFavoriteListByUserIdService,
  editFavoriteListService,
  deleteFavoriteListService,
};
