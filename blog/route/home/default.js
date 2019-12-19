// 导入文章集合
const { Article } = require("../../model/article");
// 引入mongoose-sex-page模块
const pagination = require("mongoose-sex-page");

module.exports = async (req, res) => {
  // const way = req.url;
  // 获取地址栏中的page
  let page = req.query.page || 1;
  // 每页显示数据条数
  const showDataNum = 4;
  // 页面显示的页码数
  const showPagination = 2;
  // 查询文章集合
  // const articles = await Article.find().populate("author");
  // 分页查询文章
  const articles = await pagination(Article)
    .find()
    .populate("author")
    .page(page)
    .size(showDataNum)
    .display(showPagination)
    .exec();
  // res.send(articles);
  // console.log(articles);
  res.render("home/default", { articles });
};
