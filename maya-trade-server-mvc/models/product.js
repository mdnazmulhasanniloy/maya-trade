const mongoose = require("mongoose");

//schema design
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a product name"],
      trim: [true, ""],
      unique: [true, "Name must be unique"],
      minLength: [3, "Name must be at least 3 characters"],
      maxLength: [50, "Name is too large"],
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "price can't be negative"],
    },
    unit: {
      type: String,
      required: true,
      enum: {
        values: ["kg", "liter", "pcs"],
        message: "unit value can be {VALUE}, must be kg/liter/pcs",
      },
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "quantity can't be negative"],
      validate: {
        validator: (value) => {
          const isInteger = Number.isInteger(value);
          if (isInteger) {
            return true;
          } else {
            return false;
          }
        },
      },
      message: "quantity must be an integer",
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["in-stock", "out-of-stock", "discount"],
        message: "statue can't be {VALUE}",
      },
    },
    //   createdAt:{
    //     type: Date,
    //     default: Date.now()
    //   },
    //   updatedAt:{
    //     type: Date,
    //     default: Date.now()
    //   }

    // supplier: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Users",
    // },
    // categories: [
    //   {
    //     name: { type: "string", required: true },
    //     _id: mongoose.Schema.Types.ObjectId,
    //   },
    // ],
  },
  {
    timestamps: true,
  }
);

// schema --> model --> query

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
