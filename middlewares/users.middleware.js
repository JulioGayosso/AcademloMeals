//models
const { User } = require("../models/user.model");
//utils
const { catchAsync } = require("../utils/catchAsync.util");
const { AppError } = require("../utils/app.error");

const userExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({
    attributes: { exclude: ["password"] },
    where: { status: "active", id },
  });

  if (!user) {
    return next(new AppError("the user dosn't exist in our servers", 404));
  }

  req.user = user;
  next();
});

module.exports = { userExist };
