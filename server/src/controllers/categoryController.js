import {
  createNewCategory,
  getALlCategories,
  editCategory,
  deleteCategory,
} from "../services/categoryService";

const handleCreateNewCategory = async (req, res) => {
  const response = await createNewCategory(req.body);
  return res.status(200).json(response);
};

const handleGetALlCategories = async (req, res) => {
  const response = await getALlCategories();
  return res.status(200).json(response);
};

const handleEditCategory = async (req, res) => {
  const response = await editCategory(req.body);
  return res.status(200).json(response);
};

const handleDeleteCategory = async (req, res) => {
  const response = await deleteCategory(req.body.id);
  return res.status(200).json(response);
};

module.exports = {
  handleCreateNewCategory,
  handleGetALlCategories,
  handleEditCategory,
  handleDeleteCategory,
};
