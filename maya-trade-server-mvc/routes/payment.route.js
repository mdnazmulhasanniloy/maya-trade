const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/payment.controller");

router.route(`/success/:tranId`).post(paymentController?.paymentSuccess);

module.exports = router;
