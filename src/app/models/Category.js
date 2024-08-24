const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Category = new Schema(
  {
    isChecked: { type: Boolean, default: false },
    name: { type: String }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Category", Category);
