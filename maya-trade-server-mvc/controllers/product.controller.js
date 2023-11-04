const Product = require("../models/product");
const {
  getProductsService,
  createProductService,
  deleteProductService,
  updateProductService,
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
    // console.log(req.body);
    const result = await createProductService(req.body);
    console.log("result", result); //save or create way 2
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

//update product

exports.updateProduct = async (req, res, next) => {
  try {
    //save or create way 1
    const _id = req.params.id;
    const result = await updateProductService(_id, req.body);
    console.log(result);

    res.status(200).json({
      success: true,
      message: "product successfully updated",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "product updating failed",
      data: error.message,
    });
  }
};

//delete product

exports.deleteProduct = async (req, res, next) => {
  try {
    //save or create way 1
    const _id = req.params.id;
    const result = await deleteProductService(_id);
    console.log(result);

    res.status(200).json({
      success: true,
      message: "product successfully delete",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "product deleting failed",
      data: error.message,
    });
  }
};
