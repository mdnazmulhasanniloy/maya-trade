const { default: axios } = require("axios");
const ApiError = require("../../errors/apiError");
const User = require("../../models/user");
const { ssl_payment_url, store_id, store_password, server_url } = require("../../config");

const initPayment = async (payload) => {
  try {
    const data = {
      ...payload,
      store_id: store_id,
      store_passwd: store_password,
      currency: "BDT", // use unique tran_id for each api call
      success_url: `${server_url}payment/success/${payload?.tran_id}`,
      fail_url: "http://localhost:3030/fail",
      cancel_url: "http://localhost:3030/cancel",
      ipn_url: "http://localhost:3030/ipn",
      shipping_method: "N/A",
      product_name: "Product Payment.",
      product_category: "Payment",
      product_profile: "Customer",
      ship_name: "Mostafizur Rahman",
      ship_add1: "Dhaka",
      ship_add2: "Dhaka",
      ship_city: "Dhaka",
      ship_state: "Dhaka",
      ship_postcode: 1000,
      ship_country: "Bangladesh",
    };
    // console.log(data);

    const response = await axios({
      method: "POST",
      url: ssl_payment_url,
      data: data,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    return response;
  } catch (error) {
    throw new ApiError(500, error);
  }
};

const validatePayment = (payload) => {
  try {
    const response = axios({
      method: "GET",
      url: `${ssl_payment_url}?val_id=${payload.val_id}&store_id=${store_id}&store_passwd=${store_password}&format=json`,
    });
    console.log(response);
    return response?.data;
  } catch (error) {
    throw new ApiError(500, error);
  }
};
module.exports.sslService = { initPayment, validatePayment };
