const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

//middlewares
app.use(express.json());
app.use(cors());

//routes
const UserRouter = require("./routes/user.route");
const ProductRouter = require("./routes/product.route");
const CategoryRouter = require("./routes/category.route");
const OrderRouter = require("./routes/order.route");
const PaymentRouter = require("./routes/payment.route");

//posting to database

app.use("/api/v1/user", UserRouter);
app.use("/api/v1/product", ProductRouter);
app.use("/api/v1/category", CategoryRouter);
app.use("/api/v1/order", OrderRouter);
app.use("/api/v1/payment", PaymentRouter);

app.get("/", (req, res) => {
  res.send("Route is working YaY!");
});

module.exports = app;
