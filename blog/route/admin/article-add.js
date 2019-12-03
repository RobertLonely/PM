// 引入formidable模块
const formidable = require("formidable");
// 引入path模块
const path = require("path");
// 导入文章集合
const { Article } = require("../../model/article");
module.exports = (req, res) => {
  // 创建表单解析对象
  const form = new formidable.IncomingForm();
  // 设置文件上传路径
  form.uploadDir = path.join(__dirname, "../../public/uploads");
  // 保留表单上传文件的扩展名
  form.keepExtensions = true;
  // 对表单进行解析
  form.parse(req, async (err, fields, files) => {
    // 创建文章集合
    await Article.create({
      title: fields.title,
      author: fields.author,
      publicDate: fields.publicDate,
      cover: files.cover.path.split("public")[1],
      content: fields.content
    });
  });
  res.redirect("/admin/article");
};
