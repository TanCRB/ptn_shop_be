const express = require("express");
const route = express.Router();

const verifyToken = require("../middleware/verifyToken.js");
const authorization = require("../middleware/authorization");
const SizeController = require("../app/controllers/SizeController");

route.delete("/:_id", verifyToken, authorization(["admin"]), SizeController.delete);

route.patch("/:_id", verifyToken, authorization(["admin"]), SizeController.update);

route.get("/:_id", verifyToken, authorization(["admin", "user"]), SizeController.detail);

route.post("/create", verifyToken, authorization(["admin"]), SizeController.create);

route.get("/", verifyToken, authorization(["admin", "user"]), SizeController.index);

module.exports = route;
