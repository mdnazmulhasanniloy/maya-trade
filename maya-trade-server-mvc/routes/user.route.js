const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router
  .route("/")
  .get(userController?.getUsers)
  .post(userController.createUsers);

router
  .route(`/:id`)
  .put(userController?.updateUser)
  .delete(userController?.deleteUser);
router.get("/:email", userController?.getUsersByEmail);

module.exports = router;
