import axios from "axios";
import { dataUrl } from "../share";

const createPaymentService = (data) => {
  return axios.post(`${dataUrl}/create-payment`, data);
};

const handlePayment = (data) => {
  return axios.post(`${dataUrl}/handle-payment`, data);
};

export { createPaymentService, handlePayment };
