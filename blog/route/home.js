// 引入express框架
const express = require("express");
// 创建home路由对象
const home = express.Router();

// 渲染文章页面
home.get("/", require("./home/default"));

// 渲染详细页面
home.get("/article", require("./home/article"));

// 导出路由对象
module.exports = home;
