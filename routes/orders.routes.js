const express = require("express");
//CONTROLLERS
const {
  createOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orders.controller");
//MIDDLEWARES
//user
const {
  protectSession,
  protectOrdersOwners,
} = require("../middlewares/auth.middleware");
const { mealExist } = require("../middlewares/meals.middleware");
const { orderExist } = require("../middlewares/orders.middleware");
//order
const {
  createOrderValidators,
} = require("../middlewares/validators.middlewares");

const ordersRouter = express.Router();

//controllers

//middlewares

//verbs
ordersRouter.use(protectSession);
ordersRouter.post("/", createOrderValidators, createOrder);

ordersRouter.get("/me", getAllOrders);
ordersRouter.patch("/:id", orderExist, protectOrdersOwners, updateOrder);
ordersRouter.delete("/:id", orderExist, protectOrdersOwners, deleteOrder);

module.exports = { ordersRouter };
