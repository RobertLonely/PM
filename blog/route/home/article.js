// 导入文章集合
const { Article } = require("../../model/article");
module.exports = async (req, res) => {
  // 根据ID查询文章
  const article = await Article.findOne({ _id: req.params.id }).populate(
    "author"
  );
  res.render("home/article", { article });
};
