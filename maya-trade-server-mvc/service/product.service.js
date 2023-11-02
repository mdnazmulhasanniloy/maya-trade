const Product = require("../models/product");

exports.getProductsService = async () => {
  const products = await Product.find({});
  return products;
};
exports.createProductService = async (data) => {
  const product = await Product.create(data);
  return product;
};
