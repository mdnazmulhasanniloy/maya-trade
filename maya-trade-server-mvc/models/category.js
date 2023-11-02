const mongoose = require("mongoose");

//schema design
const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a product name"],
      trim: [true, ""],
      unique: [true, "Name must be unique"],
      minLength: [3, "Name must be at least 3 characters"],
      maxLength: [50, "Name is too large"],
    },
    img: {
      type: String,
      required: [true, "Please provide a category image"],
    },
  },
  {
    timestamps: true,
  }
);

// schema --> model --> query

const Category = mongoose.model("category", categorySchema);

module.exports = Category;
