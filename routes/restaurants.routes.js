const express = require("express");

//CONTROLLERS
//restaurants
const {
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  getAllRestaurants,
  getOneRestaurant,
  createReview,
  updateReview,
  deleteReview,
} = require("../controllers/restaurants.controller");
//reviews

//MIDDLEWARES
//user-auth
const {
  protectSession,
  protectAdmin,
  protectUsersAccount,
  protectReviewsOwners,
} = require("../middlewares/auth.middleware");

//restaurant
const {
  createRestaurantValidators,
  createReviewValidators,
} = require("../middlewares/validators.middlewares");
const { restaurantExist } = require("../middlewares/restaurants.middleware");
const { reviewExist } = require("../middlewares/reviews.middleware");

const restaurantsRouter = express.Router();

//VERBS
//no protected
restaurantsRouter.get("/", getAllRestaurants); //get all restaurants with status active
restaurantsRouter.get("/:id", restaurantExist, getOneRestaurant); //get one restaurant by id
//protected
restaurantsRouter.use(protectSession);
restaurantsRouter.post("/", createRestaurantValidators, createRestaurant); //create a restaurant
restaurantsRouter.patch(
  "/:id",
  restaurantExist,
  protectAdmin,
  updateRestaurant
);
restaurantsRouter.delete(
  "/:id",
  restaurantExist,
  protectAdmin,
  deleteRestaurant
);
restaurantsRouter.post(
  "/reviews/:restaurantId",
  createReviewValidators,
  createReview
);
restaurantsRouter.patch(
  "/reviews/:id",
  reviewExist,
  protectReviewsOwners,
  updateReview
);
restaurantsRouter.delete(
  "/reviews/:id",
  reviewExist,
  protectReviewsOwners,
  deleteReview
);

module.exports = { restaurantsRouter };
