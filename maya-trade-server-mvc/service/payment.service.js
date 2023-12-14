const { default: axios } = require("axios");
const { store_id, store_password } = require("../config");
const ApiError = require("../errors/apiError");
const Order = require("../models/order");
const { sslService } = require("./ssl/ssl.service");
const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");

const tranId = uuidv4().toString();

exports.initPayment = async (data) => {
  try {
    const { ProductInfo, userId, price } = data;

    const user = await User.findById(userId);
    if (!user) {
      // res.status(401).send({ success: false, message: "" });
      throw new ApiError(401, "invalid user");
    }
    const {
      email,
      firstName,
      phone,
      address: { country, state, city, area },
    } = user;

    const paymentSession = await sslService.initPayment({
      total_amount: price,
      tran_id: tranId,
      cus_email: email,
      cus_name: firstName,
      cus_add1: area,
      cus_add2: area,
      cus_city: city,
      cus_state: state,
      cus_postcode: "1000",
      cus_country: country,
      cus_phone: phone,
    });

    await Order.create({
      products: [...ProductInfo],
      user: userId,
      paidStatus: false,
      price: price,
      transitionId: tranId,
      orderStatus: "order-pending",
    });
    return paymentSession.data;
  } catch (error) {
    throw new ApiError(400, error);
  }
};
exports.PaymentSuccessService = async (tranId) => {
  try {
    const filter = { transitionId: tranId };
    const update = { $set: { paidStatus: true } };
    const result = await Order.findOneAndUpdate(filter, update);
    return result;
  } catch (error) {
    throw new ApiError(400, error);
  }
};

exports.GetOrderWidthTranIdService = async (tranId) => {
  try {
    console.log(tranId);
    const result = await Order.findOne({ transitionId: tranId })
      .populate("user")
      .populate(`products.product`);
    return result;
  } catch (error) {
    throw new ApiError(400, error);
  }
};

exports.webhookService = async (payload) => {
  try {
    const result = await sslService?.validatePayment();
  } catch (error) {
    throw new ApiError(400, error);
  }
};
