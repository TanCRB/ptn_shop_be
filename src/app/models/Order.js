const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Order = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    payment: { type: Boolean, default: false },
    useId: { type: Schema.Types.ObjectId, ref: "User" },
    products: [{
      name: { type: String, required: true },
      color: { type: String, required: true },
      size: { type: String, required: true },
      count: { type: Number, default: 1 },
      total: { type: Number, default: 0 },
    }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", Order);
