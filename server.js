const { app } = require("./app");

//utils
const { db } = require("./utils/db.util");
const { catchAsync } = require("./utils/catchAsync.util");

//models
const { initModels } = require("./models/initModels.model");

const startServer = catchAsync(async () => {
  await db.authenticate();
  initModels();
  await db.sync();

  const PORT = 4011;

  app.listen(PORT, () => {
    console.log("express app running!");
  });
});

startServer();
