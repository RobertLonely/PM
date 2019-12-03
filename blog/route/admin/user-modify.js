// 导入用户列表
const { User } = require("../../model/user");
// 导入加密模块
const bcrypt = require("bcrypt");
module.exports = async (req, res, next) => {
  // 添加页面标识
  req.app.locals.sign = "user";
  // 获取请求参数中的id
  let id = req.query.id;
  //根据id查询用户信息
  let userInfo = await User.findOne({ _id: id });
  // 获取表单提交信息
  let { username, email, password, role, state } = req.body;
  // 验证密码是否输入正确
  let isEqual = await bcrypt.compare(password, userInfo.password);
  // 如果密码正确更新数据,否则重定向回用户信息修改页面
  if (isEqual) {
    await User.updateOne({ _id: id }, { username, email, role, state });
    res.redirect("/admin/user");
  } else {
    next(
      JSON.stringify({
        path: `/admin/user-modify?id=${id}`,
        message: "密码错误"
      })
    );
  }
};
