import { dataUrl } from "../share";
import $ from "jquery";

const createNewUserService = (data) => {
  return $.ajax({
    url: `${dataUrl}/create-new-user`,
    type: "POST",
    data: JSON.stringify(data),
    contentType: "application/json",
  });
};

const getAllUsersService = () => {
  return $.ajax({
    url: `${dataUrl}/get-all-users`,
    type: "GET",
  });
};

const editUserService = (data) => {
  return $.ajax({
    url: `${dataUrl}/edit-user`,
    type: "PUT",
    data: JSON.stringify(data),
    contentType: "application/json",
  });
};

const deleteUserService = (id) => {
  return $.ajax({
    url: `${dataUrl}/delete-user`,
    type: "DELETE",
    data: JSON.stringify({ id: id }),
    contentType: "application/json",
  });
};

const loginUserService = (data) => {
  return $.ajax({
    url: `${dataUrl}/login`,
    type: "POST",
    data: JSON.stringify(data),
    contentType: "application/json",
  });
};

const registerUserService = (data) => {
  return $.ajax({
    url: `${dataUrl}/register`,
    type: "POST",
    data: JSON.stringify(data),
    contentType: "application/json",
  });
};

export {
  createNewUserService,
  getAllUsersService,
  editUserService,
  deleteUserService,
  loginUserService,
  registerUserService,
};
