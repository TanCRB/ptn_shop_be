const express = require("express");
const route = express.Router();
const upload = require("../storage/diskStorage.js");

const verifyToken = require("../middleware/verifyToken.js");
const authorization = require("../middleware/authorization");
const ProductController = require("../app/controllers/ProductController");

route.delete("/:_id", verifyToken, authorization(["admin"]), ProductController.delete);

route.put("/:_id", verifyToken, authorization(["admin"]), upload.single("image"), ProductController.update);

route.get("/:_id", verifyToken, authorization(["admin", "user"]), ProductController.detail);

route.post("/create", verifyToken, authorization(["admin"]), upload.single("image"), ProductController.create);

// route.get("/:search", ProductController.search);

route.get("/", verifyToken, authorization(["admin", "user"]), ProductController.index);

module.exports = route;
