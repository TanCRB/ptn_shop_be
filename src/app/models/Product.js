const { object } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Product = new Schema(
  {
    title: { type: String },
    image: { type: String },
    description: { type: String, required: true },
    price: { type: Number, min: 100000, required: true },
    quantity: { type: Number, default: 100, required: true },
    count: { type: Number, default: 1 },
    rating: {
      rate: { type: Number, default: 5 },
      count: { type: Number, default: 0 },
    },
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    size_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "Size" }],
    color_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "Color" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", Product);
