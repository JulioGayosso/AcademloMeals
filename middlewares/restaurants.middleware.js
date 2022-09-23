//models
const { Restaurant } = require("../models/restaurant.model");
const { AppError } = require("../utils/app.error");
//utils
const { catchAsync } = require("../utils/catchAsync.util");

const restaurantExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const restaurant = await Restaurant.findOne({ where: { id } });

  if (!restaurant) {
    return next(new AppError("the restaurant dosen't exist", 404));
  }

  req.restaurant = restaurant;
  next();
});

module.exports = { restaurantExist };
