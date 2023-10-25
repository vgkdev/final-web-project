import {
  createNewProductComment,
  getALlProductComments,
  editProductComment,
  deleteProductComment,
} from "../services/productCommentService";

const handleCreateNewProductComment = async (req, res) => {
  const response = await createNewProductComment(req.body);
  return res.status(200).json(response);
};

const handleGetALlProductComments = async (req, res) => {
  const response = await getALlProductComments();
  return res.status(200).json(response);
};

const handleEditProductComment = async (req, res) => {
  const response = await editProductComment(req.body);
  return res.status(200).json(response);
};

const handleDeleteProductComment = async (req, res) => {
  const response = await deleteProductComment(req.body.id);
  return res.status(200).json(response);
};

module.exports = {
  handleCreateNewProductComment,
  handleGetALlProductComments,
  handleEditProductComment,
  handleDeleteProductComment,
};
