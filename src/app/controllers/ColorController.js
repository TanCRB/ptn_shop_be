const Color = require("../models/Color");

class ColorController {
  // [GET] /size
  async index(req, res) {
    try {
      const colorDatas = await Color.find({});
      if (colorDatas.length !== 0) {
        return res.status(200).json(colorDatas);
      }
      return res.status(404).json({
        message: "Không tìm thấy danh sách color",
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
      const colorCreate = await Color.create(req.body);
      return res.status(200).json({
        message: "Tạo color thành công",
        datas: colorCreate,
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
      const colorDetail = await Color.findOne({ _id: req.params._id });
      if (colorDetail.length !== 0) {
        return res.status(200).json({
          message: `Tìm color: ${req.params._id} thành công`,
          datas: colorDetail,
        });
      }
      return res.status(404).json({
        message: "Không tìm thấy color",
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
      const colorUpdate = await Color.updateOne(
        { _id: req.params._id },
        req.body
      );
      return res.status(200).json({
        message: `Update color: ${req.params._id} thành công`,
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
      const colorDelete = await Color.deleteOne({ _id: req.params._id });
      return res.status(200).json({
        message: `Delete color: ${req.params._id} thành công`,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
}

module.exports = new ColorController();
