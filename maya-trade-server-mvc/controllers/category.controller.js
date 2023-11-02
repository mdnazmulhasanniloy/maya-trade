const Category = require("../models/category");
const {
  getCategoriesService,
  createCategoriesService,
} = require("../service/category.service");

//get products
exports.getCategories = async (req, res) => {
  try {
    const products = await getCategoriesService();

    if (!products) {
      return res.status(400).json({
        success: false,
        message: "categories not found",
        data: products,
      });
    }
    res.status(200).json({
      success: true,
      data: products,
      message: "categories loaded successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "categories loaded failed",
      data: error.message,
    });
  }
};

//add Product

exports.createCategory = async (req, res, next) => {
  try {
    //save or create way 1
    const result = await createCategoriesService(req.body);
    //save or create way 2
    // const product = new Product(req.body);
    // const result = await product.save();
    res.status(200).json({
      success: true,
      message: "category successfully inserted",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "category inserted failed",
      data: error.message,
    });
  }
};
