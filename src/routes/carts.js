const express = require("express");
const route = express.Router();

// const verifyToken = require("../middleware/verifyToken.js");
// const authorization = require("../middleware/authorization");
const CartController = require("../app/controllers/CartController");

route.delete("/:_id", CartController.delete);

route.get("/:_id", CartController.detail);

route.post("/create", CartController.create);

route.get("/", CartController.index);

module.exports = route;
