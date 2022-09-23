//models
const { Meal } = require("../models/meal.model");
const { Restaurant } = require("../models/restaurant.model");
//utils
const { AppError } = require("../utils/app.error");
const { catchAsync } = require("../utils/catchAsync.util");

const mealExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const meal = await Meal.findOne({
    include: [{ model: Restaurant }],
    where: { status: "active", id },
  });

  if (!meal) {
    return next(new AppError("the meal dosen't exist on our servers", 404));
  }

  req.meal = meal;
  next();
});

module.exports = { mealExist };
