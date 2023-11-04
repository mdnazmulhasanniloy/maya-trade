const Product = require("../models/product");

//get all products
exports.getProductsService = async () => {
  const products = await Product.find({});
  return products;
};

//add a new product
exports.createProductService = async (data) => {
  const product = await Product.create(data);
  // console.log(product);
  return product;
};

//update a product
exports.updateProductService = async (_id, data) => {
  const product = await Product.findOneAndUpdate({ _id: _id }, data);
  return product;
};

//delete a product
exports.deleteProductService = async (_id) => {
  const product = await Product.deleteOne({ _id: _id });
  return product;
};
