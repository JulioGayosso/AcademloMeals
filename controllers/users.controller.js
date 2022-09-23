const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config({ path: "./config.env" });

//models
const { User } = require("../models/user.model");
const { Order } = require("../models/order.model");

//utils
const { catchAsync } = require("../utils/catchAsync.util");
const { AppError } = require("../utils/app.error");

const signupUser = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  const salt = await bcrypt.genSalt(12);
  const hashpassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({ name, email, password: hashpassword });

  newUser.password = undefined;

  res.status(201).json({
    status: "success",
    data: { newUser },
  });
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: { email, status: "active" },
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError("wrong credentiasl", 400));
  }

  user.password = undefined;

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(200).json({
    status: "success",
    data: { user, token },
  });
});

const updateUser = catchAsync(async (req, res, next) => {
  const { name, email } = req.body;
  const { user } = req;

  await user.update({ name, email });

  res.status(200).json({
    status: "success",
    data: { user },
  });
});

const deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  await user.update({ status: "deleted" });

  res.status(204).json({
    status: "success",
  });
});

const getAllOrdersOfUser = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const orders = await Order.findAll({ where: { sessionUser } });

  res.status(200).json({
    status: "success",
    data: { orders },
  });
});

const getOneOrderOfUser = catchAsync(async (req, res, next) => {
  const { sessionUser, order } = req;

  const userOrder = order.findAll({ where: { sessionUser } });

  res.status(200).json({
    status: "success",
    data: { userOrder },
  });
});

/*
const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll({
    attributes: { exclude: ["password"] },
    where: { status: "active" },
  });
  const { mealId } = req.params;
  const {} = req.body;

  res.status(200).json({
    status: "success",
    data: { users },
  });
});

const getOneUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  res.status(200).json({
    status: "success",
    data: { user },
  });
});*/

module.exports = {
  signupUser,
  login,
  updateUser,
  deleteUser,
  getAllOrdersOfUser,
  getOneOrderOfUser,
};
