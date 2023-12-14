const ApiError = require("../errors/apiError");
const {
  PaymentSuccessService,
  GetOrderWidthTranIdService,
  initPayment,
  webhookService,
} = require("../service/payment.service");

// create a payment
exports.createPayment = async (req, res, next) => {
  try {
    // console.log("first");
    const payment = await initPayment(req.body, res);
    // console.log(payment);
    res.send({ success: true, url: payment?.redirectGatewayURL });
  } catch (error) {
    next(error);
  }
};

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

exports.webhook = async (req, res, next) => {
  try {
    const result = await webhookService(req.body);
    res
      .status(200)
      .send({ success: true, message: "payment verified", data: result });
  } catch (error) {
    throw new ApiError(400, error);
  }
};
