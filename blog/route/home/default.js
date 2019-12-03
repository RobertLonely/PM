// 导入文章集合
const { Article } = require("../../model/article");
module.exports = async (req, res) => {
  const way = req.url;
  // 查询文章集合
  const articles = await Article.find().populate("author");
  res.render("home/default", { way, articles });
};
