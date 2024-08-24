const express = require("express");
const route = express.Router();

const verifyToken = require("../middleware/verifyToken.js");
const authorization = require("../middleware/authorization");
const UserController = require("../app/controllers/UserController")

route.delete("/:_id", verifyToken, authorization(["admin"]), UserController.delete);

route.put("/:_id", verifyToken, authorization(["admin", "user"]), UserController.update);

route.get("/:_id", verifyToken, authorization(["admin", "user"]), UserController.detail);

// get all user
route.get("/", verifyToken, authorization(["admin", "user"]), UserController.index);

route.post("/login", UserController.login);

route.post("/register", UserController.register);



module.exports = route;
