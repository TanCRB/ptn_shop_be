const siteRoute = require("./site");
const usersRoute = require("./users");
const productsRoute = require("./products");
const categoriesRoute = require("./categories");
const sizesRoute = require("./sizes");
const colorsRoute = require("./colors");
const cartsRoute = require("./carts");
const ordersRoute = require("./orders");

function route(app, cors) {

  app.use("/auth", cors, usersRoute);

  app.use("/carts", cors, cartsRoute);
  
  app.use("/products/orders", cors, ordersRoute);

  app.use("/products/colors", cors, colorsRoute);

  app.use("/products/sizes", cors, sizesRoute);

  app.use("/products/categories", cors, categoriesRoute);

  app.use("/products", cors, productsRoute);

  app.use("/", cors, siteRoute);
}

module.exports = route;
