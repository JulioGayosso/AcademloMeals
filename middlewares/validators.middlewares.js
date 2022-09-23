const { body, validationResult } = require("express-validator");
const { AppError } = require("../utils/app.error");
//utils
const { catchAsync } = require("../utils/catchAsync.util");

const checkValidations = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((err) => err.msg);
    const message = errorMessages.join(". ");
    return next(new AppError(message, 400));
  }
  next();
};

const creatUserValidators = [
  body("name")
    .isString()
    .withMessage("Name must be a string")
    .notEmpty()
    .withMessage("Name cannot be empty")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters"),
  body("email").isEmail().withMessage("Must provide a valid email"),
  body("password")
    .isString()
    .withMessage("Password must be a string")
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
  checkValidations,
];

const createReviewValidators = [
  body("comment")
    .isString()
    .withMessage("comment must be a string")
    .notEmpty()
    .withMessage("comments cannot be empty"),
  checkValidations,
];

const createRestaurantValidators = [
  body("name")
    .isString()
    .withMessage("name must be a string")
    .notEmpty()
    .withMessage("name cannot be empty"),
  body("address")
    .isString()
    .withMessage("address must be a string")
    .notEmpty()
    .withMessage("address cannot be empty"),
  body("rating")
    .isInt({ max: 5 })
    .withMessage("rating must be a number between 1 to 5")
    .notEmpty()
    .withMessage("rating cannot be empty"),
  checkValidations,
];
const createMealValidators = [
  body("name")
    .isString()
    .withMessage("meal name must be a string")
    .notEmpty()
    .withMessage("meal name cannot be empty"),
  body("price").isInt().withMessage("price must be a number"),
  checkValidations,
];
const createOrderValidators = [
  body("quantity")
    .isInt()
    .withMessage("quantity must higher than 0")
    .notEmpty()
    .withMessage("quantity cannot be empty"),
  checkValidations,
];

module.exports = {
  creatUserValidators,
  createReviewValidators,
  createRestaurantValidators,
  createMealValidators,
  createOrderValidators,
};
