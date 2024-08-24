const express = require("express");
const route = express.Router();

const verifyToken = require("../middleware/verifyToken.js");
const authorization = require("../middleware/authorization");
const OrderController = require("../app/controllers/OrderController");

route.delete("/:_id", verifyToken, authorization(["admin", "user"]), OrderController.delete);

route.put("/:_id", verifyToken, authorization(["admin"]), OrderController.update);

route.post("/create", verifyToken, authorization(["user"]), OrderController.create);

route.get("/", verifyToken, authorization(["admin", "user"]), OrderController.index);

module.exports = route;
