// 引入用户集合
const { User } = require("../../model/user");
// 引入bcrypt模块
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
  // 将帐号和密码从body中解构出来
  let { email, password } = req.body;

  // 当客户端关闭js功能时,如果用户没有输入邮件地址或密码,显示错误信息
  if (email.trim().length === 0 || password.trim().length === 0)
    return res
      .status(400)
      .render("admin/login", { message: "请输入正确的帐号或密码" });

  // 获取数据库中用户的密码
  let user = await User.findOne({ email });

  // 如果用户存在
  if (user) {
    // 比对用户输入密码和数据库已有密码
    let isLike = await bcrypt.compare(password, user.password);

    // 如果密码正确
    if (isLike) {
      // 向session中添加用户名
      req.session.username = user.username;
      // 向session中添加用户id
      req.session.userId = user._id;

      req.app.locals.userInfo = user;
      res.redirect("/admin/user");
    } else {
      res.status(400).render("admin/login", { message: "帐号或密码错误" });
    }
  } else {
    res.status(400).render("admin/login", { message: "帐号或密码错误" });
  }
};
