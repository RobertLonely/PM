// 引入mongoose模块
const mongoose = require("mongoose");
// 引入对密码进行加密的模块
const bcrypt = require("bcrypt");
// 引入验证表单的模块
const Joi = require("@hapi/joi");

// 创建集合规则
let userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 6,
    message: "用户名不能为空"
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 10,
    maxlength: 20
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  state: {
    type: Number,
    required: true,
    default: 0
  }
});
mongoose.set("useCreateIndex", true);
// 创建集合
const User = mongoose.model("User", userSchema);

// 建立创建用户的函数
async function createUser(user) {
  // 将参数中的属性解构出来
  const { username, email, password, role, state } = user;
  // 生成随机字符串
  let salt = await bcrypt.genSalt(10);
  // 对密码进行加密
  let pw = await bcrypt.hash(password, salt).catch(err => console.log(err));
  //
  return await User.create({
    username,
    email,
    password: pw,
    role,
    state
  }).catch(err => console.log(err));
}

// 使用@hapi/joi验证表单
function verifyForm(from) {
  const schema = Joi.object({
    username: Joi.string()
      .min(2)
      .max(6)
      .required()
      .error(new Error("用户名输入错误")),

    email: Joi.string()
      .min(10)
      .max(20)
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "cn"] }
      })
      .error(new Error("邮箱输入错误")),

    password: Joi.string()
      .pattern(/^[a-zA-Z0-9]{3,50}$/)
      .error(new Error("密码输入错误")),

    role: Joi.string()
      .required()
      .error(new Error("身份输入错误")),

    state: Joi.number()
      .default(0)
      .required()
      .error(new Error("状态输入错误"))
  });
  return schema.validate(from);
}

// 导出用户集合
module.exports = {
  User,
  createUser,
  verifyForm
};
