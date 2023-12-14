const Order = require("../models/order");
const User = require("../models/user");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

//payment require
const SSLCommerzPayment = require("sslcommerz-lts");
const payment_tore_id = process.env.PAYMENT_STORE_ID;
const payment_tore_passwd = process.env.PAYMENT_STORE_PASSWORD;
const is_live = false;

//get order
exports.getOrderService = async (req, res, next) => {
  const order = await Order.find({});
  return order;
};
 
 

// update a order by id
exports.updateOrderService = async (_id, data) => {
  try {
    const order = await Order.findOneAndUpdate({ _id: _id }, data);
    return order;
  } catch (error) {
    return error;
  }
};

//delete a Order
exports.deleteOrderService = async (_id) => {
  const order = await Order.deleteOne({ _id: _id });
  return order;
};
