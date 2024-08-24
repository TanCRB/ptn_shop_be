const Product = require("../models/Product");

class SiteController {
  async index(req, res) {
    try {
      const productDatas = await Product.find({})
        .populate({
          path: "category_id",
          select: "name",
        })
        .populate("color_id")
        .populate("size_id");
      if (productDatas.length !== 0) {
        return res.status(200).json(productDatas);
      }
      return res.status(404).json({
        message: "Không tìm danh sách products",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
}

module.exports = new SiteController();
