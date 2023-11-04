const Category = require("../models/category");
const {
  getCategoriesService,
  createCategoriesService,
  deleteCategoriesService,
  updateCategoriesService,
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

//update category

exports.updateCategory = async (req, res, next) => {
  try {
    //save or create way 1
    const _id = req.params.id;
    const result = await updateCategoriesService(_id, req.body);
    console.log(result);

    res.status(200).json({
      success: true,
      message: "category successfully updated",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "category updating failed",
      data: error.message,
    });
  }
};

//delete category

exports.deleteCategory = async (req, res, next) => {
  try {
    //save or create way 1
    const _id = req.params.id;
    const result = await deleteCategoriesService(_id);
    console.log(result);

    res.status(200).json({
      success: true,
      message: "category successfully delete",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "category deleting failed",
      data: error.message,
    });
  }
};
