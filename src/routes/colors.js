const express = require("express");
const route = express.Router();

const verifyToken = require("../middleware/verifyToken.js");
const authorization = require("../middleware/authorization");
const ColorController = require("../app/controllers/ColorController");

route.delete("/:_id", verifyToken, authorization(["admin"]), ColorController.delete);

route.patch("/:_id", verifyToken, authorization(["admin"]), ColorController.update);

route.get("/:_id", verifyToken, authorization(["admin", "user"]), ColorController.detail);

route.post("/create", verifyToken, authorization(["admin"]), ColorController.create);

route.get("/", verifyToken, authorization(["admin", "user"]), ColorController.index);

module.exports = route;
