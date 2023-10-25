import {
  createNewOrder,
  getALlOrders,
  editOrder,
  deleteOrder,
} from "../services/orderService";

const handleCreateNewOrder = async (req, res) => {
  const response = await createNewOrder(req.body);
  return res.status(200).json(response);
};

const handleGetALlOrders = async (req, res) => {
  const response = await getALlOrders();
  return res.status(200).json(response);
};

const handleEditOrder = async (req, res) => {
  const response = await editOrder(req.body);
  return res.status(200).json(response);
};

const handleDeleteOrder = async (req, res) => {
  const response = await deleteOrder(req.body.id);
  return res.status(200).json(response);
};

module.exports = {
  handleCreateNewOrder,
  handleGetALlOrders,
  handleEditOrder,
  handleDeleteOrder,
};
