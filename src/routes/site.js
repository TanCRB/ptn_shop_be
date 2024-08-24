const express = require("express");
const route = express.Router();

const siteController = require("../app/controllers/SiteController")

route.get("/home", siteController.index);

module.exports = route;
