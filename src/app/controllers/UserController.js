const User = require("../models/User");
const userValidation = require("../../validation/validation");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 8;
const nodemailer = require("nodemailer");

class UserController {
  // [GET] /
  async index(req, res) {
    let perPage = 5;
    let page = parseInt(req.query.page);
    let skip = (page - 1) * perPage;
    let length = (await User.find({})).length;
    let lengthPage = Math.ceil(length / perPage);
    try {
      const userDatas = await User.find({}).skip(skip).limit(perPage);
      if (userDatas.length !== 0) {
        return res.status(200).json({
          message: "Danh sách users",
          datas: {
            lengthPage: lengthPage,
            perPage,
            userDatas,
          },
        });
      }
      return res.status(404).json({
        message: "Không tìm danh sách user",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  // [POST] /register
  async register(req, res) {
    try {
      const { email, password } = req.body;
      const { error } = userValidation(req.body);

      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const isExits = await User.findOne({
        email,
      });

      if (isExits) {
        return res.status(400).json({ message: "Email đã được đăng ký" });
      }

      const hasPass = await bcrypt.hash(password, saltRounds);
      const user = await User.create({ ...req.body, password: hasPass });

      // Password send Email
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "pntan.dhti14a6hn@sv.uneti.edu.vn",
          pass: "neservjpkicqcuiu",
        },
      });
      await transporter.sendMail({
        from: '"Phạm Nhật Tân" <pntan.dhti14a6hn@sv.uneti.edu.vn>',
        to: email,
        subject: "Send Email",
        html: password,
      });

      return res.status(200).json({
        message: "Tạo user thành công",
        data: user,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  // [POST] /login
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({
          message: "Email chưa được đăng ký!",
        });
      }
      const pass = await bcrypt.compare(password, user.password);
      if (!pass) {
        return res.status(404).json({ message: "Mật khẩu sai, vui lòng đăng nhập lại!" });
      }

      const accessToken = jwt.sign(
        { userId: user._id },
        process.env.ACCESS_TOKEN_KEY,
        { expiresIn: "24h" }
      );
      const refreshToken = jwt.sign(
        { userId: user._id },
        process.env.REFRESH_TOKEN_KEY,
        { expiresIn: "1y" }
      );

      User.updateOne(
        { _id: user._id },
        {
          $set: {
            token: refreshToken,
          },
        }
      );

      return res.status(200).json({
        accessToken,
      });
      
      // if(!accessToken) {
      //   return res.status(200).json({
      //     refreshToken,
      //   });
      // } else {
      //   return res.status(200).json({
      //     accessToken,
      //   });
      // }
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  // [GET] /_id
  async detail(req, res) {
    try {
      const userDetail = await User.findOne({ _id: req.params._id });
      if (userDetail.length !== 0) {
        return res.status(200).json({
          message: `Tìm user: ${req.params._id} thành công`,
          datas: userDetail,
        });
      }
      return res.status(404).json({
        message: `Không tìm user: ${req.params._id}`,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  // [PUT] /_id
  async update(req, res) {
    try {
      const userUpdate = await User.updateOne(
        { _id: req.params._id },
        req.body
      );
      return res.status(200).json({
        message: `Update user: ${req.params._id} thành công`,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  // [DELETE] /_id
  async delete(req, res) {
    try {
      const userDelete = await User.deleteOne({ _id: req.params._id });
      return res.status(200).json({
        message: `Delete user: ${req.params._id} thành công`,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
}

module.exports = new UserController();
