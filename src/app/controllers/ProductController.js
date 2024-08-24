const Product = require("../models/Product");

class ProductController {
  // [GET] /products
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

  // async search(req, res) {
  //   try {
  //     const searchProducts = await Product.find({ title: req.params.search });
  //     if (searchProducts.length !== 0) {
  //       return res.status(200).json(searchProducts);
  //     }
  //     if (searchProducts.length === 0) {
  //       return res.status(200).json([]);
  //     }
  //     return res.status(404).json([
  //       {
  //         message: "Không tìm thấy đường dẫn",
  //       },
  //     ]);
  //   } catch (error) {
  //     res.status(500).json({
  //       message: error.message,
  //     });
  //   }
  // }

  // [POST] /create
  async create(req, res) {
    try {
      const body = req.body;
      const productCreate = await Product.create({
        ...body,
        image: req.file.path,
      });
      return res.status(200).json({
        message: "Tạo product thành công",
        datas: productCreate,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  // [GET] /_id
  async detail(req, res) {
    try {
      const productDetail = await Product.findOne({
        _id: req.params._id,
      })
        .populate({
          path: "category_id",
          select: "name",
        })
        .populate("color_id")
        .populate("size_id");
      if (productDetail.length !== 0) {
        return res.status(200).json(productDetail);
      }
      return res.status(404).json({
        message: `Không tìm product: ${req.params._id}`,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  // [UPDATE] /_id
  async update(req, res) {
    try {
      const body = req.body;
      const productUpdate = await Product.updateOne(
        { _id: req.params._id },
        {
          ...body,
          image: req.file.path,
        }
      );
      return res.status(200).json({
        message: `Update product: ${req.params._id} thành công`,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  // [DELETE] /_id
  async delete(req, res) {
    try {
      const productDelete = await Product.deleteOne({ _id: req.params._id });
      return res.status(200).json({
        message: `Delete product: ${req.params._id} thành công`,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
}

module.exports = new ProductController();
