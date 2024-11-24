const categoryController = require("../controllers/categoryController");
const express = require("express");
const router = express.Router();

router.post("/api/category", categoryController.createCategory)
router.get("/api/categories", categoryController.getCategory)
router.get("/api/categories/:id", categoryController.getsinglecategory)
router.put("/api/category/:id", categoryController.updatecategory)
router.delete("/api/category/:id", categoryController.deletecategory)

module.exports= router;