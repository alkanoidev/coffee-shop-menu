const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController.js");

router.get("/", itemController.itemList);

router.get("/item/:name", itemController.item);

router.post("/item/new/:category", itemController.newItem);

router.put("/item/update/:name", itemController.editItem);

router.delete("/item/delete/:name", itemController.deleteItem);

module.exports = router;
