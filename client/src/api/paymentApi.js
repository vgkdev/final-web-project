import axios from "axios";
import { dataUrl } from "../share";

const createPaymentService = (data) => {
  return axios.post(`${dataUrl}/create-payment`, data);
};

export { createPaymentService };
