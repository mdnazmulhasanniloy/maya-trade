const {
  createOrderService,
  getOrderService,
} = require("../service/order.service");

//get order

exports.getOrder = async (req, res, next) => {
  try {
    const order = await getOrderService();
    if (order) {
      res.status(200).json({
        success: true,
        message: "order loaded successfully",
        data: order,
      });
      return;
    }

    res.status(400).json({
      success: false,
      message: "data inserted failed",
      data: order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Get order failed",
      data: error.message,
    });
  }
};

//add Product
exports.createOrder = async (req, res, next) => {
  try {
    //save or create way 1
    // console.log(req.body);
    const result = await createOrderService(req.body, res);

    // console.log("result", result);
    return;

    if (GatewayPageURL) {
      res.send({ success: true, url: GatewayPageURL });
      return;
    }

    res.status(200).json({
      success: true,
      message: "data successfully inserted",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "data inserted failed",
      data: error.message,
    });
  }
};
