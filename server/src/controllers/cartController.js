import {
  createNewCart,
  getALlCarts,
  editCart,
  deleteCart,
  getALlCartsByUserId,
  deleteCartByUserId,
} from "../services/cartService";

const handleCreateNewCart = async (req, res) => {
  const response = await createNewCart(req.body);
  return res.status(200).json(response);
};

const handleGetALlCarts = async (req, res) => {
  const response = await getALlCarts();
  return res.status(200).json(response);
};

const handleGetALlCartsByUserId = async (req, res) => {
  const response = await getALlCartsByUserId(req.query.userId);
  return res.status(200).json(response);
};

const handleEditCart = async (req, res) => {
  const response = await editCart(req.body);
  return res.status(200).json(response);
};

const handleDeleteCart = async (req, res) => {
  const response = await deleteCart(req.body.id);
  return res.status(200).json(response);
};

const handleDeleteCartByUserId = async (req, res) => {
  const response = await deleteCartByUserId(req.body.userId);
  return res.status(200).json(response);
};

module.exports = {
  handleCreateNewCart,
  handleGetALlCarts,
  handleGetALlCartsByUserId,
  handleEditCart,
  handleDeleteCart,
  handleDeleteCartByUserId,
};
