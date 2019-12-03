// 导入用户集合
const { User } = require("../../model/user");
module.exports = async (req, res) => {
  // 获取请求参数中的id
  let { id, message } = req.query;
  if (id) {
    // 查询用户信息
    let user = await User.findOne({ _id: id });
    res.render("admin/user-edit", {
      user,
      btnInfo: "修改",
      link: "/admin/user-modify?id=" + id,
      message
    });
  } else {
    res.render("admin/user-edit", { btnInfo: "添加", link: "/admin/user-add" });
  }
};
