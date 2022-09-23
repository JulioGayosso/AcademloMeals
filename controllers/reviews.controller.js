//Models
const { Review } = require("../models/review.model");
const { catchAsync } = require("../utils/catchAsync.util");

const getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.findAll({});

  res.status(200).json({
    status: "success",
    data: { reviews },
  });
});

const getOneReview = catchAsync(async (req, res, next) => {
  const { review } = req;

  res.status(200).json({
    status: "success",
    data: { review },
  });
});

const createReview = catchAsync(async (req, res, next) => {
  const { comment, restaurantId, rating } = req.body;

  const newReview = await Review.create({ comment, restaurantId, rating });

  res.status(201).json({
    status: "success",
    data: { newReview },
  });
});

const updateReview = catchAsync(async (req, res, next) => {
  const { review } = req;
  const { comment } = req.body;

  await review.update({ comment });

  res.status(200).json({
    status: "success",
    data: { review },
  });
});

const deleteReview = catchAsync(async (req, res, next) => {
  const { review } = req;

  await review.update({ status: "deleted" });

  res.status(204).json({
    status: "success",
  });
});

module.exports = {
  getAllReviews,
  getOneReview,
  createReview,
  deleteReview,
  updateReview,
};
