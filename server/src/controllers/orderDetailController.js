import {
  createNewOrderDetail,
  getALlOrderDetails,
  editOrderDetail,
  deleteOrderDetail,
} from "../services/orderDetailService";

const handleCreateNewOrderDetail = async (req, res) => {
  const response = await createNewOrderDetail(req.body);
  return res.status(200).json(response);
};

const handleGetALlOrderDetails = async (req, res) => {
  const response = await getALlOrderDetails();
  return res.status(200).json(response);
};

const handleEditOrderDetail = async (req, res) => {
  const response = await editOrderDetail(req.body);
  return res.status(200).json(response);
};

const handleDeleteOrderDetail = async (req, res) => {
  const response = await deleteOrderDetail(req.body.id);
  return res.status(200).json(response);
};

module.exports = {
  handleCreateNewOrderDetail,
  handleGetALlOrderDetails,
  handleEditOrderDetail,
  handleDeleteOrderDetail,
};
