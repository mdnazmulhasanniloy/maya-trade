const { PaymentSuccessService } = require("../service/payment.service");

exports.paymentSuccess = async (req, res, next) => {
  try {
    const tranId = req.params.tranId;
    //save or create way 1
    // console.log(req.body);
    const result = await PaymentSuccessService(tranId, res);

    res.send({ result });
    return;

    // res.status(200).json({
    //   success: true,
    //   message: "data successfully inserted",
    //   data: result,
    // });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "payment is error",
      data: error.message,
    });
  }
};
