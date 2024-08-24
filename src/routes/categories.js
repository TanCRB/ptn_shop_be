const express = require("express");
const route = express.Router();

const verifyToken = require("../middleware/verifyToken.js");
const authorization = require("../middleware/authorization");
const CategoryController = require("../app/controllers/CategoryController");

route.delete("/:_id", CategoryController.delete);

route.put("/:_id", verifyToken, authorization(["admin"]), CategoryController.update);

route.post("/create", verifyToken, authorization(["admin"]), CategoryController.create);

route.get("/", verifyToken, authorization(["admin", "user"]), CategoryController.index);

module.exports = route;
