// 引入mongoose模块
const mongoose = require("mongoose");
// 创建文章集合规则
const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: "1",
    maxlength: "20",
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  publicDate: {
    type: Date,
    default: Date.now
  },
  cover: {
    type: String,
    default: null
  },
  content: {
    type: String
  }
});

// 创建文章集合
const Article = mongoose.model("Article", articleSchema);

// 导出文章集合
module.exports = {
  Article
};
