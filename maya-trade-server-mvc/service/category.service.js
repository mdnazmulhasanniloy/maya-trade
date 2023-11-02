const Category = require("../models/category");

exports.getCategoriesService = async () => {
  const category = await Category.find({});
  return category;
};
exports.createCategoriesService = async (data) => {
  const category = await Category.create(data);
  return category;
};
