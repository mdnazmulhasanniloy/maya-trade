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

// create a new order

const tranId = uuidv4();

exports.createOrderService = async (req, res) => {
  const { ProductInfo, userId, price } = req;
  // console.log(userId);

  const user = await User.findById(userId);

  if (!user) {
    res.status(401).send({ success: false, message: "invalid user" });
    return;
  }

  const {
    email,
    firstName,
    phone,
    address: { country, state, city, area },
  } = user;

  const data = {
    total_amount: price,
    currency: "BDT",
    tran_id: tranId, // use unique tran_id for each api call
    success_url: `http://localhost:2000/api/v1/payment/success/${tranId}`,
    fail_url: "http://localhost:3030/fail",
    cancel_url: "http://localhost:3030/cancel",
    ipn_url: "http://localhost:3030/ipn",
    shipping_method: "Courier",
    product_name: "Computer.",
    product_category: "Electronic",
    product_profile: "general",
    cus_name: firstName,
    cus_email: email,
    cus_add1: area,
    cus_add2: area,
    cus_city: city,
    cus_state: state,
    cus_postcode: "1000",
    cus_country: country,
    cus_phone: phone,
    cus_fax: phone,
    ship_name: "Mostafizur Rahman",
    ship_add1: "Dhaka",
    ship_add2: "Dhaka",
    ship_city: "Dhaka",
    ship_state: "Dhaka",
    ship_postcode: 1000,
    ship_country: "Bangladesh",
  };

  const sslcz = new SSLCommerzPayment(
    payment_tore_id,
    payment_tore_passwd,
    is_live
  );

  sslcz?.init(data)?.then(async (apiResponse) => {
    // Redirect the user to payment gateway
    let GatewayPageURL = apiResponse?.GatewayPageURL;
    res.send({ success: true, url: GatewayPageURL });
    const finalOrder = await {
      products: [...ProductInfo],
      user: userId,
      paidStatus: false,
      transitionId: tranId.toString(),
      orderStatus: "order-pending",
    };
    console.log("finalOrder", finalOrder);
    const order = await Order.create(finalOrder);
    console.log("order", order);
  });

  return;
  //   console.log(user);
  //   const order = await Order.create(data);
  //   return order;
};

// update a order by id
exports.updateOrderService = async (_id, data) => {
  const order = await Order.findOneAndUpdate({ _id: _id }, data);
  return order;
};

//delete a Order
exports.deleteOrderService = async (_id) => {
  const order = await Order.deleteOne({ _id: _id });
  return order;
};
