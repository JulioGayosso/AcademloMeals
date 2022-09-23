//models
const { Meal } = require("../models/meal.model");
const { Order } = require("../models/order.model");
const { Restaurant } = require("../models/restaurant.model");
const { AppError } = require("../utils/app.error");
//utils
const { catchAsync } = require("../utils/catchAsync.util");
//middleware

const createOrder = catchAsync(async (req, res, next) => {
  const { quantity, mealId } = req.body;
  const { sessionUser } = req;

  const meal = await Meal.findOne({ where: { id: mealId, status: "active" } });

  if (!meal) {
    return next(new AppError("the meal dosn't exist", 403));
  }

  const newOrder = await Order.create({
    userId: sessionUser.id,
    mealId,
    quantity,
    totalPrice: meal.price * quantity,
  });

  res.status(201).json({
    status: "success",
    data: { newOrder },
  });
});

const getAllOrders = catchAsync(async (req, res, next) => {
  const { id } = req.sessionUser;

  const orders = await Order.findAll({
    where: { userId: id },
    include: [{ model: Meal, include: [{ model: Restaurant }] }],
  });

  res.status(200).json({
    status: "success",
    orders,
  });
});

/*
const getOneOrder = catchAsync(async (req, res, next) => {
  const { order } = req;

  res.status(200).json({
    status: "success",
    data: { order },
  });
});*/

const updateOrder = catchAsync(async (req, res, next) => {
  const { order } = req;

  await order.update({ status: "completed" });

  res.status(200).json({
    status: "success",
    data: { order },
  });
});

const deleteOrder = catchAsync(async (req, res, next) => {
  const { order } = req;

  await order.update({ status: "cancelled" });

  res.status(204).json({
    status: "success",
  });
});

module.exports = {
  createOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
};
