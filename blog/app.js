// 引入express框架
const express = require("express");
// 引入path处理模块
const path = require("path");
// 引入处理post参数的模块
const bodyParser = require("body-parser");
// 引入session模块
const session = require("express-session");
// 引入art-template模块
const template = require("art-template");
// 引入dateFormat模块
const dateformat = require("dateformat");

// 创建web服务器
const app = express();

// 配置session
app.use(
  session({
    // 必选选项，这是用于签名sessionId的,可以是任意字符串
    secret: "secret key",
    // 强制将“未初始化”的会话保存到存储中
    saveUninitialized: false,
    // 强制将会话保存回会话存储，即使在请求期间从未修改过会话也是如此
    resave: false,
    // sessionId的存储对象
    cookie: {
      // 设置过期时间为24h,如果不设置，当关闭页面时cookie就会被清除
      maxAge: 24 * 60 * 60 * 1000
    }
  })
);

// 配置body-parser模块，拦截所有请求
app.use(bodyParser.urlencoded({ extended: false }));

//允许访问静态资源
app.use(express.static(path.join(__dirname, "./public")));

// 配置渲染引擎，当使用art后缀的模板时，使用express-art-template
app.engine("art", require("express-art-template"));
// 配置模板所在文件名，以及文件路径
app.set("views", path.join(__dirname, "views"));
// 设置模板默后缀
app.set("view engine", "art");

// 向模板中导入变量
template.defaults.imports.dateformat = dateformat;

// 连接数据库
require("./model/connect");
// 创建用户
// require("./model/user");

// 导入admin路由对象
const admin = require("./route/admin");
// 导入home路由对象
const home = require("./route/home");

// 拦截地址为'/admin'开头的路由请求，判断用户的登录状态
app.use("/admin", require("./middleware/routeGuard"));
// 拦截路由
app.use("/admin", admin);
app.use("/home", home);

// 统一拦截并处理错误
app.use((err, req, res, next) => {
  // 将错误对象从字符串转换为对象
  let result = JSON.parse(err);
  res.redirect(`${result.path}&message=${result.message}`);
});

// 监听web端口
app.listen(3000);
console.log("web服务器启动成功");
