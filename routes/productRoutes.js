const productController = require("../controllers/productControllers");
const express = require("express");
const uploads = require("../middlewares/upload");
const router = express.Router();

router.post("/api/product", uploads.single("image"), productController.createProduct)
router.get("/api/products", productController.getProduct)

module.exports = router;