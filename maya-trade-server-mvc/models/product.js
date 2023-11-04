const mongoose = require("mongoose");

//schema design
const productSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a product name"],
      trim: [true, ""],
      unique: [true, "Name must be unique"],
      minLength: [3, "Name must be at least 3 characters"],
      maxLength: [50, "Name is too large"],
    },
    img: {
      type: String,
      required: [true, "Please provide a product image"],
    },
    category: {
      categoryName: { type: "string", required: true },
      categoryId: mongoose.Schema.Types.ObjectId,
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
    discount: {
      type: Number,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["in-stock", "out-of-stock", "discount"],
        message: "statue can't be {VALUE}",
      },
    },
    keywords: [String],
    rating: {
      type: Number, // A number for the rating
      min: 0, // Minimum value for the rating
      max: 5, // Maximum value for the rating (assuming a 5-point scale)
    },
    like: [{ _id: mongoose.Schema.Types.ObjectId }],

    // supplier: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Users",
    // },
  },
  {
    timestamps: true,
  }
);

// schema --> model --> query

const Product = mongoose.model("Product", productSchema);
// console.log(Product);

module.exports = Product;
