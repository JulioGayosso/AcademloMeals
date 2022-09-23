//models
const { Meal } = require("../models/meal.model");
const { Restaurant } = require("../models/restaurant.model");
//utils
const { catchAsync } = require("../utils/catchAsync.util");

const createMeal = catchAsync(async (req, res, next) => {
  const { id } = req.restaurant;

  const { name, price } = req.body;

  const newMeal = await Meal.create({
    name,
    price,
    restaurantId: id,
  });

  res.status(201).json({
    status: "success",
    newMeal,
  });
});

const getAllMeals = catchAsync(async (req, res, next) => {
  const meals = await Meal.findAll({
    include: [{ model: Restaurant }],
    where: { status: "active" },
  });

  res.status(200).json({
    status: "success",
    data: { meals },
  });
});

const getOneMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;

  res.status(200).json({
    status: "success",
    data: { meal },
  });
});

const updateMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;
  const { name, price } = req.body;

  await meal.update({ name, price });

  res.status(200).json({
    status: "success",
    data: { meal },
  });
});

const deleteMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;

  await meal.update({ status: "deleted" });

  res.status(204).json({
    status: "success",
  });
});

module.exports = {
  getAllMeals,
  getOneMeal,
  createMeal,
  updateMeal,
  deleteMeal,
};
