const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");
const app = express();

dotenv.config();
const PORT = process.env.PORT || 3000;
const cors = require("cors");

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use("/public", express.static("public"));

// body-parser
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

// HTTP logger: log từ server
app.use(morgan("combined"));

// connect db
const route = require("./routes");
const db = require("./config/db");
db.Connect();

// router
route(app, cors(corsOptions));

app.listen(PORT, () => {
  console.log(`Example app listening on PORT ${PORT}`);
});
