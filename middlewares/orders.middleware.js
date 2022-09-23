//models
const { Order } = require("../models/order.model");
//utils
const { catchAsync } = require("../utils/catchAsync.util");
const { AppError } = require("../utils/app.error");

const orderExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const order = await Order.findOne({ where: { id, status: "active" } });

  if (!order) {
    return next(new AppError("the order dosn't exist in our server", 404));
  }

  req.order = order;
  next();
});

module.exports = { orderExist };
