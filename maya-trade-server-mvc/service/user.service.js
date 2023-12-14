const User = require("../models/user");

// get user
exports.getUserService = async () => {
  try {
    const users = await User.find({});
    return users;
  } catch (error) {
    next(error);
  }
};

// get user by email
exports.getUsersByEmailService = async (data) => {
  try {
    const user = await User.findOne({ email: data });
    //   console.log(user);
    return user;
  } catch (error) {
    next(error);
  }
};

//add a new user
exports.createUserService = async (data) => {
  try {
    const user = await User.create(data);
    // console.log(user);
    return user;
  } catch (error) {
    next(error);
  }
};

//update a user
exports.updateUserService = async (_id, data) => {
  try {
    const user = await User.findOneAndUpdate({ _id: _id }, data);
    return user;
  } catch (error) {
    next(error);
  }
};

//delete a user
exports.deleteUserService = async (_id) => {
  try {
    const user = await User.deleteOne({ _id: _id });
    return user;
  } catch (error) {
    next(error);
  }
};
