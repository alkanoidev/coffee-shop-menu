const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController.js");

router.get("/", itemController.item_list);

router.get("/item/:name", itemController.item);

module.exports = router;
