const Category = require("../models/category");

//get all categories
exports.getCategoriesService = async () => {
  const category = await Category.find({});
  return category;
};

//create a new category
exports.createCategoriesService = async (data) => {
  const category = await Category.create(data);
  return category;
};

//update a category
exports.updateCategoriesService = async (_id, data) => {
  const category = await Category.findOneAndUpdate({ _id: _id }, data);
  return category;
};

//delete a category
exports.deleteCategoriesService = async (_id) => {
  const category = await Category.deleteOne({ _id: _id });
  return category;
};
