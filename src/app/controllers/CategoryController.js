const Category = require("../models/Category");

class CategoryController {
  // [GET] /categorys
  async index(req, res) {
    try {
      const categoryDatas = await Category.find({});
      if (categoryDatas.length !== 0) {
        return res.status(200).json(categoryDatas);
      }
      return res.status(404).json({
        message: "Không tìm thấy danh sách category",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  // [POST] /create
  async create(req, res) {
    try {
      const categoryCreate = await Category.create(req.body);
      return res.status(200).json({
        message: "Tạo category thành công",
        datas: categoryCreate,
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
      const categoryDetail = await Category.findOne({ _id: req.params._id });
      if (categoryDetail.length !== 0) {
        return res.status(200).json({
          message: `Tìm category: ${req.params._id} thành công`,
          datas: categoryDetail,
        });
      }
      return res.status(404).json({
        message: "Không tìm thấy category",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  // [PATCH] /_id
  async update(req, res) {
    try {
      const categoryUpdate = await Category.updateOne(
        { _id: req.params._id },
        req.body
      );
      return res.status(200).json({
        message: `Update category: ${req.params._id} thành công`,
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
      const categoryDelete = await Category.deleteOne({ _id: req.params._id });
      return res.status(200).json({
        message: `Delete category: ${req.params._id} thành công`,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
}

module.exports = new CategoryController();
