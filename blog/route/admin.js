// 引入express框架
const express = require("express");
// 创建admin路由对象
const admin = express.Router();

// 渲染登录页面
admin.get("/login", require("./admin/loginPage"));

// 实现登录功能
admin.post("/login", require("./admin/login"));

// 渲染用户列表页面
admin.get("/user", require("./admin/userPage"));

// 退出登录
admin.get("/logout", require("./admin/logout"));

// 渲染添加用户页面
admin.get("/user-add", require("./admin/user-edit"));

// 实现添加用户的功能
admin.post("/user-add", require("./admin/user-add"));

// 渲染用户信息修改页面
admin.get("/user-modify", require("./admin/user-edit"));

// 实现用户信息修改功能
admin.post("/user-modify", require("./admin/user-modify"));

// 实现用户删除功能
admin.post("/user-delete", require("./admin/user-delete"));

// 渲染文章列表页面
admin.get("/article", require("./admin/articlePage"));

// 渲染发布文章页面
admin.get("/article-add", require("./admin/article-edit"));

// 实现发布文章功能
admin.post("/article-add", require("./admin/article-add"));

// 渲染文章修改页面
admin.get("/article-modify", require("./admin/article-edit"));
// 导出路由对象
module.exports = admin;
