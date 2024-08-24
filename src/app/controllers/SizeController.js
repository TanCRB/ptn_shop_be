const Size = require("../models/Size");

class SizeController {
  // [GET] /size
  async index(req, res) {
    try {
      const sizeDatas = await Size.find({});
      if (sizeDatas.length !== 0) {
        return res.status(200).json(sizeDatas);
      }
      return res.status(404).json({
        message: "Không tìm thấy danh sách size",
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
      const sizeCreate = await Size.create(req.body);
      return res.status(200).json({
        message: "Tạo size thành công",
        datas: sizeCreate,
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
      const sizeDetail = await Size.findOne({ _id: req.params._id });
      if (sizeDetail.length !== 0) {
        return res.status(200).json({
          message: `Tìm size: ${req.params._id} thành công`,
          datas: sizeDetail,
        });
      }
      return res.status(404).json({
        message: "Không tìm thấy size",
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
      const sizeUpdate = await Size.updateOne(
        { _id: req.params._id },
        req.body
      );
      return res.status(200).json({
        message: `Update size: ${req.params._id} thành công`,
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
      const sizeDelete = await Size.deleteOne({ _id: req.params._id });
      return res.status(200).json({
        message: `Delete size: ${req.params._id} thành công`,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
}

module.exports = new SizeController();
