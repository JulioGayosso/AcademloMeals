const { Meal } = require("./meal.model");
const { Order } = require("./order.model");
const { Restaurant } = require("./restaurant.model");
const { Review } = require("./review.model");
const { User } = require("./user.model");

const initModels = () => {
  User.hasMany(Order, { foreignKey: "userId" });
  Order.belongsTo(User);

  User.hasMany(Review, { foreignKey: "userId" });
  Review.belongsTo(User);

  Restaurant.hasMany(Meal, { foreignKey: "restaurantId" });
  Meal.belongsTo(Restaurant);

  Restaurant.hasMany(Review, { foreignKey: "restaurantId" });
  Review.belongsTo(Restaurant);

  Meal.hasOne(Order, { foreignKey: "mealId" });
  Order.belongsTo(Meal);
};

module.exports = { initModels };
