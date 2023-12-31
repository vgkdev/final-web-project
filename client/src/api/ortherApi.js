import axios from "axios";
import { dataUrl } from "../share";

const createNewOrderService = (data) => {
  return axios.post(`${dataUrl}/create-new-order`, data);
};

const getAllOrdersService = () => {
  return axios.get(`${dataUrl}/get-all-orders`);
};

const editOrderService = (data) => {
  return axios.put(`${dataUrl}/edit-order`, data);
};

const deleteOrderService = (id) => {
  return axios.delete(`${dataUrl}/delete-order`, {
    data: {
      id: id,
    },
  });
};

export {
  createNewOrderService,
  getAllOrdersService,
  editOrderService,
  deleteOrderService,
};
