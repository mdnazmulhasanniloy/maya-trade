const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

//middlewares
app.use(express.json());
app.use(cors());

//routes
const ProductRouter = require("./routes/product.route");
const CategoryRouter = require("./routes/category.route");

//posting to database

app.use("/api/v1/product", ProductRouter);
app.use("/api/v1/category", CategoryRouter);

app.get("/", (req, res) => {
  res.send("Route is working YaY!");
});

module.exports = app;
