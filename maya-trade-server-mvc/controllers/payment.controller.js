const {
  PaymentSuccessService,
  GetOrderWidthTranIdService,
} = require("../service/payment.service");

//get order

exports.getOrder = async (req, res) => {
  try {
    const tranId = req.params.tranId;
    const result = await GetOrderWidthTranIdService(tranId);
    console.log(result);
    if (!result) {
      return res
        .status(404)
        .send({ success: false, message: "Order not found", data: result });
    }

    res
      .status(200)
      .send({ success: true, message: "Order successfully get", data: result });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "Order not founds",
      data: error.message,
    });
  }
};

//update order
exports.paymentSuccess = async (req, res, next) => {
  try {
    const tranId = req.params.tranId;
    const result = await PaymentSuccessService(tranId);

    if (!result) {
      return res.status(400).json({
        success: false,
        message: "payment is failed",
        data: result,
      });
    }

    res.redirect(`http://localhost:3000/payment/success/${tranId}`);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "payment is failed",
      data: error.message,
    });
  }
};
