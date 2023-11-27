const {
  getUserService,
  createUserService,
  updateUserService,
  deleteUserService,
  getUsersByEmailService,
} = require("../service/user.service");
const jwt = require("jsonwebtoken");

//get users
exports.getUsers = async (req, res) => {
  try {
    const users = await getUserService();

    if (!users) {
      return res.status(400).json({
        success: false,
        message: "users not found",
        data: users,
      });
    }
    res.status(200).json({
      success: true,
      data: users,
      message: "users loaded successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "users loaded failed",
      data: error.message,
    });
  }
};

//get user by email
exports.getUsersByEmail = async (req, res, next) => {
  try {
    const email = req.params.email;
    const result = await getUsersByEmailService(email);
    // console.log(result);
    if (result) {
      const token = jwt.sign(
        { email: result?.email },
        process.env.ACCESS_TOKEN,
        {
          expiresIn: "3d",
        }
      );
      return res.status(200).json({
        success: true,
        data: { ...result?._doc, accessToken: token },
        message: "users loaded successfully",
      });
    }

    if (!result) {
      return res.status(400).json({
        success: false,
        message: "users not found",
        data: result,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "users loaded failed",
      data: error.message,
    });
  }
};
//add users
exports.createUsers = async (req, res) => {
  try {
    const result = await createUserService(req.body);
    console.log("result", result);

    res.status(200).json({
      success: true,
      data: result,
      message: "user successfully  create",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "user creating failed",
      data: error.message,
    });
  }
};

//update user

exports.updateUser = async (req, res, next) => {
  try {
    //save or create way 1
    const _id = req.params.id;
    const result = await updateUserService(_id, req.body);
    console.log(result);

    res.status(200).json({
      success: true,
      message: "user successfully updated",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "user updating failed",
      data: error.message,
    });
  }
};

//delete user

exports.deleteUser = async (req, res, next) => {
  try {
    //save or create way 1
    const _id = req.params.id;
    const result = await deleteUserService(_id);
    console.log(result);

    res.status(200).json({
      success: true,
      message: "user successfully delete",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "user deleting failed",
      data: error.message,
    });
  }
};
