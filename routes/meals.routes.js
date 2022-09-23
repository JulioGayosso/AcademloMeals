const express = require("express");

//CONTROLLERS
const {
  getAllMeals,
  getOneMeal,
  createMeal,
  updateMeal,
} = require("../controllers/meals.controller");
//MIDDLEWARES

//user
const {
  protectSession,
  protectUsersAccount,
  protectAdmin,
} = require("../middlewares/auth.middleware");
const { mealExist } = require("../middlewares/meals.middleware");
const { restaurantExist } = require("../middlewares/restaurants.middleware");
//meal
const {
  createMealValidators,
} = require("../middlewares/validators.middlewares");

const mealsRouter = express.Router();

//controllers

//middlewares

mealsRouter.get("/", getAllMeals);
mealsRouter.get("/:id", mealExist, getOneMeal);

mealsRouter.use(protectSession);
mealsRouter.post("/:id", restaurantExist, createMealValidators, createMeal);
mealsRouter.patch("/:id", mealExist, protectAdmin, updateMeal);
mealsRouter.delete("/:id", mealExist, protectAdmin, updateMeal);

module.exports = { mealsRouter };
