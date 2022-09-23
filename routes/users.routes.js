const express = require("express");

const usersRouter = express.Router();

//CONSTROLLERS
//user
const {
  signupUser,
  login,
  updateUser,
  deleteUser,
  getAllOrdersOfUser,
  getOneOrderOfUser,
} = require("../controllers/users.controller");

//MIDDLEWARES
//user
const { userExist } = require("../middlewares/users.middleware");
const {
  protectSession,
  protectUsersAccount,
} = require("../middlewares/auth.middleware");
const {
  creatUserValidators,
} = require("../middlewares/validators.middlewares");
//order
const { orderExist } = require("../middlewares/orders.middleware");

//VREBS
usersRouter.post("/signup", creatUserValidators, signupUser);
usersRouter.post("/login", login);

usersRouter.use(protectSession); // protected routes
usersRouter.patch("/:id", userExist, protectUsersAccount, updateUser);
usersRouter.delete("/:id", userExist, protectUsersAccount, deleteUser);
usersRouter.get("/orders", protectUsersAccount, getAllOrdersOfUser);
usersRouter.get(
  "/orders/:id",
  protectUsersAccount,
  orderExist,
  getOneOrderOfUser
);

module.exports = { usersRouter };
