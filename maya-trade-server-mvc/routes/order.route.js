const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");

router.route("/").get(orderController?.getOrder).post();

router.route("/checkout").post(orderController?.createOrder);

router.route(`/:id`).put().delete();

module.exports = router;
