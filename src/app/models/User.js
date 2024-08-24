const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  name: { type: String, required: true },
  image: { type: String, default: "https://th.bing.com/th/id/OIP.Gg0lRdcH7S-EO2NWbRzCMQAAAA?pid=ImgDet&w=167&h=183&c=7&dpr=1.3" },
  // address: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, default: process.env.DEFAULT_PASSWORD, required: true },
  // token: { type: String },
  // isLogin: { type: Boolean, default: false },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    ],
    required: true
  },
  role: { type: String, enum: ["admin", "user"], default: "user" }
}, {
  timestamps: true
});

module.exports = mongoose.model("User", User);
