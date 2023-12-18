const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

app.use(express.json());
app.use(cors());

//routes
const UserRouter = require("./routes/user.route");
const ProductRouter = require("./routes/product.route");
const CategoryRouter = require("./routes/category.route");
const OrderRouter = require("./routes/order.route");
const PaymentRouter = require("./routes/payment.route");
const ErrorHandler = require("./middlewares/globalErrorHandler"); 

//posting to database

app.use("/api/v1/user", UserRouter);
app.use("/api/v1/product", ProductRouter);
app.use("/api/v1/category", CategoryRouter);
app.use("/api/v1/order", OrderRouter);
app.use("/api/v1/payment", PaymentRouter);


app.get("/", async (req, res, next) => {
  try {
    res.send(`simple server is running`);
  } catch (error) {
    throw next(error);
  }
});


// rout not defiant
app.all("*", (req, res, next) => {
  const err = new Error(`Can not find ${req.originalUrl} on the server`);
  err.status = "fail";
  err.statusCode = 404;

  next(err);
});

//middlewares
app.use(ErrorHandler);

app.get("/", (req, res) => {
  res.send("Route is working YaY!");
});

module.exports = app;
