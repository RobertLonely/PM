// 引入用户列表
const { User } = require("../../model/user");
module.exports = async (req, res) => {
  // 添加页面标识
  req.app.locals.sign = "user";
  // 查询用户总数
  let allUserNum = await User.countDocuments();
  // 每页显示数据条数
  let showDataNum = 5;
  // 总页数
  let allPageNum = Math.ceil(allUserNum / showDataNum);
  // 接收客户端传递过来的当前页数
  let page = req.query.page || 1;
  // 限制页面显示用户的数量
  let show = await User.find()
    .skip((page - 1) * showDataNum)
    .limit(showDataNum);

  res.render("admin/user", { show, allPageNum, page });
};
