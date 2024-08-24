const Order = require("../models/Order");
const Product = require("../models/Product");

class OrderController {
  async index(req, res) {
    let perPage = 5;
    let page = parseInt(req.query.page);
    let skip = (page - 1) * perPage;
    let length = (await Order.find({})).length;
    let lengthPage = Math.ceil(length / perPage);
    try {
      const dataOrder = await Order.find({}).populate({
        path: "useId",
        select: "email",
      }).skip(skip).limit(perPage);
      if (dataOrder.length !== 0) {
        return res.status(200).json({
          message: "Danh sách users",
          datas: {
            lengthPage: lengthPage,
            perPage,
            dataOrder,
          },
        });
      }
      if (dataOrder.length === 0) {
        return res.status(200).json([]);
      }
      return res.status(404).json([
        {
          message: "Không tìm thấy đường dẫn 🤦‍♀️",
        },
      ]);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  async create(req, res) {
    try {
      const { products } = req.body;
      const product = await Product.findById(products.id);
      if (product.quantity > 0 || product.quantity >= products.count) {
        const createOrder = await Order.create({
          ...req.body,
          useId: req.userID._id,
        });
        await Product.findOneAndUpdate(
          { _id: products.id },
          { quantity: product.quantity - products.count }
        );
        return res.status(200).json({
          message: "Đặt hàng thành công!",
          data: createOrder,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  async update(req, res) {
    try {
      const updateOrder = await Order.updateOne(
        { _id: req.params._id },
        req.body
      );
      if (updateOrder) {
        return res.status(200).json({
          message: "Đơn hàng của quý khách đã được cập nhật!",
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  async delete(req, res) {
    try {
      const deleteOrder = await Order.deleteOne({ _id: req.params._id });
      if (deleteOrder) {
        return res.status(200).json({
          message: "Xin lỗi đơn hàng của b đã bị hủy, Cảm ơn quý khách đã quan tâm và đặt hàng!",
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
}

module.exports = new OrderController();
