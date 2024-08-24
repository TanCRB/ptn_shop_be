const Cart = require("../models/Cart");
const Product = require("../models/Product");

class CartController {
  // [GET] /
  async index(req, res) {
    try {
      const cartDatas = await Cart.find({});
      if (cartDatas.length !== 0) {
        return res.status(200).json(cartDatas);
      }
      if (cartDatas.length === 0) {
        return res.status(200).json([]);
      }
      return res.status(404).json([
        {
          message: "Không tìm thấy đường dẫn",
        },
      ]);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  // [POST] /create
  async create(req, res) {
    try {
        const cartCreate = Cart.create(req.body);
        return res.status(200).json({
          message: "Create Cart succesfully!",
          data: cartCreate,
        });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  // [GET] /:_id
  async detail(req, res) {
    try {
      const cartDetail = await Cart.find({ _id: req.params._id });
      if (cartDetail.length !== 0) {
        return res.status(200).json(cartDetail);
      }
      if (cartDetail.length === 0) {
        return res.status(200).json([]);
      }
      return res.status(404).json({
        message: "Không tìm thấy đường dẫn",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  // [DELETE] /:_id
  async delete(req, res) {
    try {
      const cartDelete = await Cart.deleteOne({ _id: req.params._id });
      return res.status(200).json({
        message: `Delete cart _id: ${req.params._id}`,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
}

module.exports = new CartController();
