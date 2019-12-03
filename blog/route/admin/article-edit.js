module.exports = (req, res) => {
  // 添加页面标识
  req.app.locals.sign = "article";
  res.render("admin/article-edit");
};
