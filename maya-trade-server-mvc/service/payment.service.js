const Order = require("../models/order");

exports.GetOrderWidthTranIdService = async (tranId) => {
  console.log(tranId);
  const result = await Order.findOne({ transitionId: tranId })
    .populate("user")
    .populate(`products.product`);
  return result;
};

exports.PaymentSuccessService = async (tranId) => {
  const filter = { transitionId: tranId };
  const update = { $set: { paidStatus: true } };
  const result = await Order.findOneAndUpdate(filter, update);
  return result;
};
