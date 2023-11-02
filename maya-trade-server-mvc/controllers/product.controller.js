const Product = require("../models/product");
const {
  getProductsService,
  createProductService,
} = require("../service/product.service");

//get products
exports.getProducts = async (req, res) => {
  try {
    const products = await getProductsService();

    if (!products) {
      return res.status(400).json({
        success: false,
        message: "Product not found",
        data: products,
      });
    }
    res.status(200).json({
      success: true,
      data: products,
      message: "product loaded successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "products loaded failed",
      data: error.message,
    });
  }
};

//add Product

exports.createProduct = async (req, res, next) => {
  try {
    //save or create way 1
    const result = await createProductService(req.body);
    //save or create way 2
    // const product = new Product(req.body);
    // const result = await product.save();
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
