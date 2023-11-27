const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const orderSchema = mongoose.Schema(
  {
    paidStatus: {
      type: Boolean,
      required: [true, "Paid status is required"],
    },
    transitionId: {
      type: String,
      required: [true, "Transition id is required"],
    },
    user: {
      type: ObjectId,
      required: [true, "User is required"],
      ref: "user",
    },
    products: [
      {
        _id: {
          type: ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          required: [true, "Please provide a product quantity"],
          min: [1, "Quantity must be minimum length is 1"],
        },
      },
    ],
    orderStatus: {
      type: String,
      required: [true, "Order status is required"],
      enum: {
        values: [
          "order-pending",
          "order-confirm",
          "order-canceled",
          "order-on-the-way",
          "order-shifted",
          "order-complete",
        ],
        message: "Status can't be {VALUE}",
      },
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
