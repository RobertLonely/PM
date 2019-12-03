// 导入用户列表
const { User } = require("../../model/user");
module.exports = async (req, res) => {
  // 获取用户id
  let { id } = req.body;
  // 根据用户id删除用户
  await User.findOneAndDelete({ _id: id });
  // 重定向回用户列表页面
  res.redirect("/admin/user");
};
