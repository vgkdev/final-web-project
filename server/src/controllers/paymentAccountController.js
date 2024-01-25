import {
  createNewPaymentAccount,
  getALlPaymentAccounts,
  editPaymentAccount,
  getPaymentAccountById,
  deletePaymentAccount,
} from "../services/paymentAccountService";

const handleCreateNewPaymentAccount = async (req, res) => {
  const response = await createNewPaymentAccount(req.body);
  return res.status(200).json(response);
};

const handleGetALlPaymentAccount = async (req, res) => {
  const response = await getALlPaymentAccounts();
  return res.status(200).json(response);
};

const handleEditPaymentAccount = async (req, res) => {
  const response = await editPaymentAccount(req.body);
  return res.status(200).json(response);
};

const handleGetPaymentAccountById = async (req, res) => {
  const response = await getPaymentAccountById(req.body);
  return res.status(200).json(response);
};

const handleDeletePaymentAccount = async (req, res) => {
  const response = await deletePaymentAccount(req.body.id);
  return res.status(200).json(response);
};

module.exports = {
  handleCreateNewPaymentAccount,
  handleGetALlPaymentAccount,
  handleEditPaymentAccount,
  handleGetPaymentAccountById,
  handleDeletePaymentAccount,
};
