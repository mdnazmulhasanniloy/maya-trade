const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");

router
  .route("/")
  .get(productController?.getProducts)
  .post(productController?.createProduct);
router
  .route("/:id")
  .put(productController?.updateProduct)
  .delete(productController?.deleteProduct);

module.exports = router;
