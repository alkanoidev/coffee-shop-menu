const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

router.get("/", categoryController.categoryList);

router.get("/category/:name", categoryController.category);

router.post("/category/new", categoryController.newCategory);

router.post("/category/update/:name", categoryController.editCategory);

router.delete("/category/delete/:name", categoryController.deleteCategory);

module.exports = router;
