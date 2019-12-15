// 导入处理路径的模块
var path = require("path");

//导入自动生成html文件的插件
var htmlWebpackPlugin = require("html-webpack-plugin");

//导入VueLoaderPlugin
var VueLoaderPlugin = require("vue-loader/lib/plugin");

// 导出一个配置对象
module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "./src/main.js"), //项目入口文件
  output: {
    //配置输出选项
    path: path.resolve(__dirname, "./dist"), //配置输出路径
    filename: "bundle.js" //配置输出文件名
  },
  plugins: [
    new htmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/index.html"), //模板路径
      filename: "index.html" //自动生成的html文件的名称
    }),
    new VueLoaderPlugin()
  ],
  module: {
    //用来配置第三方loader模块
    rules: [
      //处理css文件规则
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      //处理less文件规则
      { test: /\.less$/, use: ["style-loader", "css-loader", "less-loader"] },
      // 配置 Babel 来转换高级的ES6语法
      { test: /\.js$/, use: "babel-loader", exclude: "/node_modules/" },
      //处理解析转换.vue文件的规则
      { test: /\.vue$/, use: "vue-loader" },
      //处理字体图标的规则
      { test: /\.(ttf|eot|svg|woff|woff2)$/, use: "url-loader" },
      //处理图片的规则
      { test: /\.(jpg|jpeg|svg|gif|png)$/, use: "url-loader" }
    ]
  }
};
