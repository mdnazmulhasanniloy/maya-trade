const mongoose = require("mongoose");
const validator = require("validator");

//schema design
const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please provide your email"],
      validate: [validator?.isEmail, "Please provide a valid email"],
      unique: [true, "email must be unique"],
    },
    img: {
      type: String,
      required: [true, "Please provide a product image"],
      validate: [validator.isURL, "Please provide a valid image Url"],
    },
    firstName: {
      type: String,
      required: [true, "Please provide your first name"],
      minLength: [3, "first name must be at least 3 characters"],
      maxLength: [50, "first name is too large"],
    },
    lastName: {
      type: String,
      required: [true, "Please provide your last name"],
      minLength: [3, "last name must be at least 3 characters"],
      maxLength: [50, "last name is too large"],
    },
    phone: {
      type: Number,
      required: [true, "please provide a valid phone number"],
      minLength: [8, "phone number must be at least 8 characters"],
      maxLength: [
        15,
        "phone number is too large, please provide maximum 15 characters",
      ],
    },
    role: {
      type: String,
      required: true,
      enum: {
        values: ["buyer", "admin"],
        message: "role can't be {VALUE}",
      },
    },
    address: {
      area: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
    },
  },
  {
    timestamps: true,
  }
);

// schema --> model --> query

const User = mongoose.model("User", userSchema);
// console.log(Product);

module.exports = User;
