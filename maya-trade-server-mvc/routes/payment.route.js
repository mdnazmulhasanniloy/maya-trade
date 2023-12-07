const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/payment.controller");

router
  .route(`/success/:tranId`)
  .get(paymentController?.getOrder)
  .post(paymentController?.paymentSuccess);

module.exports = router;
