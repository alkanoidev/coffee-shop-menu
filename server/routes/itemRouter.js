const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController.js");

router.get("/", itemController.itemList);

router.get("/item/:name", itemController.item);

router.get("/category/:category", itemController.getByCategory);

router.post("/item/new/:category", itemController.newItem);

router.post("/item/update/:name", itemController.editItem);

router.delete("/item/delete/:name", itemController.deleteItem);

router.get("/search/:substring", itemController.search);

module.exports = router;
