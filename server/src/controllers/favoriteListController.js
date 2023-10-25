import {
  createNewFavoriteList,
  getALlFavoriteLists,
  getFavoriteListByUserId,
  editFavoriteList,
  deleteFavoriteList,
} from "../services/favoriteListService";

const handleCreateNewFavoriteList = async (req, res) => {
  const response = await createNewFavoriteList(req.body);
  return res.status(200).json(response);
};

const handleGetALlFavoriteLists = async (req, res) => {
  const response = await getALlFavoriteLists();
  return res.status(200).json(response);
};

const handleGetFavoriteListByUserId = async (req, res) => {
  const response = await getFavoriteListByUserId(req.query.userId);
  return res.status(200).json(response);
};

const handleEditFavoriteList = async (req, res) => {
  const response = await editFavoriteList(req.body);
  return res.status(200).json(response);
};

const handleDeleteFavoriteList = async (req, res) => {
  const response = await deleteFavoriteList(req.body.id);
  return res.status(200).json(response);
};

module.exports = {
  handleCreateNewFavoriteList,
  handleGetALlFavoriteLists,
  handleGetFavoriteListByUserId,
  handleEditFavoriteList,
  handleDeleteFavoriteList,
};
