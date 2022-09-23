const express = require("express");

const app = express();

app.use(express.json());

//Routes
const { mealsRouter } = require("./routes/meals.routes");
const { usersRouter } = require("./routes/users.routes");
const { restaurantsRouter } = require("./routes/restaurants.routes");
const { ordersRouter } = require("./routes/orders.routes");

//endpoints
app.use("/api/v1/restaurants", restaurantsRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/orders", ordersRouter);
app.use("/api/v1/meals", mealsRouter);

//global error handler
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const status = error.status || "fail";

  res.status(statusCode).json({
    status,
    message: error.message,
    error,
    stack: error.stack,
  });
});

//catch non exiting endpoint
app.all("*", (req, res) => {
  res.status(404).json({
    status: "error",
    message: `${req.method} ${req.url} doesn't exist in our server `,
  });
});

module.exports = { app };
