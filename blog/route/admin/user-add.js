// 引入User模块
const { User, createUser, verifyForm } = require("../../model/user");
module.exports = async (req, res) => {
  // 添加页面标识
  req.app.locals.sign = "user";
  // 验证用户
  try {
    const { value, error } = await verifyForm(req.body);

    // 如果error不为undefined,抛出它
    if (error) throw error;

    // 查询email是否注册
    const isLogin = await User.findOne({ email: value.email });

    if (isLogin) {
      throw new Error("邮箱已注册");
    } else {
      // 用户信息通过
      await createUser(value);
      res.redirect("/admin/user");
    }
  } catch (error) {
    res.render("admin/user-edit", { message: error.message });
  }
};
