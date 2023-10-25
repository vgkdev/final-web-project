import {
  createNewUser,
  getALlUsers,
  editUser,
  deleteUser,
  loginUser,
  verifyUser,
  changePassword,
  registerUser,
} from "../services/userService";

const handleCreateNewUser = async (req, res) => {
  const response = await createNewUser(req.body);
  return res.status(200).json(response);
};

const handleGetALlUsers = async (req, res) => {
  const response = await getALlUsers();
  return res.status(200).json(response);
};

const handleEditUser = async (req, res) => {
  const response = await editUser(req.body);
  return res.status(200).json(response);
};

const handleDeleteUser = async (req, res) => {
  const response = await deleteUser(req.body.id);
  return res.status(200).json(response);
};

const handleLoginUser = async (req, res) => {
  const response = await loginUser(req.body);
  return res.status(200).json(response);
};

const handleVerifyUser = async (req, res) => {
  const response = await verifyUser(req.body);
  return res.status(200).json(response);
};

const handleChangePassword = async (req, res) => {
  const response = await changePassword(req.body);
  return res.status(200).json(response);
};

const handleRegisterUser = async (req, res) => {
  const response = await registerUser(req.body);
  return res.status(200).json(response);
};

module.exports = {
  handleCreateNewUser,
  handleGetALlUsers,
  handleEditUser,
  handleDeleteUser,
  handleLoginUser,
  handleVerifyUser,
  handleChangePassword,
  handleRegisterUser,
};
