const User = require("../app/models/User");

const findUser = async (userId) => {
  // user._id === userId
  const res = await User.findOne({ _id: userId });
  return res;
};

const authorization = (permission) => {
  return async (req, res, next) => {
    let { userId } = req.userID;
    if (!userId) {
      return res.status(403).json("Vui lòng đăng nhập!");
    }
    const user = await findUser(userId);
    if (!user) {
      return res.status(403).json("Không tìm thấy User!");
    }

    if (!permission.includes(user.role)) {
      return res.status(401).json("Bạn không có quyền hành động!");
    }
    next();
  };
};

module.exports = authorization;