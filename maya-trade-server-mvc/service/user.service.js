const User = require("../models/user");

// get user
exports.getUserService = async () => {
  const users = await User.find({});
  return users;
};

// get user by email
exports.getUsersByEmailService = async (data) => {
  const user = await User.findOne({ email: data });
  //   console.log(user);
  return user;
};

//add a new user
exports.createUserService = async (data) => {
  const user = await User.create(data);
  // console.log(user);
  return user;
};

//update a user
exports.updateUserService = async (_id, data) => {
  const user = await User.findOneAndUpdate({ _id: _id }, data);
  return user;
};

//delete a user
exports.deleteUserService = async (_id) => {
  const user = await User.deleteOne({ _id: _id });
  return user;
};
