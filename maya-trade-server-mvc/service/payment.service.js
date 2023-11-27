const Order = require("../models/order");

exports.PaymentSuccessService = async (tranId, data) => {
  console.log(tranId);
  const filter = { transitionId: tranId };
  const update = { $set: { paidStatus: "true" } };
  const result = await Order.findOneAndUpdate(filter, update);
  return result;
};
