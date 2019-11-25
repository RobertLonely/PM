<?php

session_start();

//载入配置文件
require_once '../config.php';
function login(){
  global $message;
  //校验是否输入邮箱地址或是输入框是否存在
  if(empty($_POST['email'])){
    $message='请输入邮箱地址';
    return;
  }

  if(empty($_POST['password'])){
    $message='请输入登入密码';
    return;
  }

  $email=$_POST['email'];
  $password=$_POST['password'];

  //当客户端提交过来的表单信息完整，就应该开始对其进行数据校验
  $conn=mysqli_connect(DB_HOST,DB_USER,DB_PASS,DB_NAME);
  if(!$conn){
    exit('<h1>连接数据库失败</h1>');
  }

  $query=mysqli_query($conn,"select * from users where email='{$email}' limit 1;");
  if(!$query){
    $message='登入失败，请重试！';
    return;
  }

  $user=mysqli_fetch_assoc($query);
  if(!$user){
    //用户不存在
    $message='邮箱与用户名不匹配';
    return;
  }

  if($user['password']!==$password){
    //密码不正确
    $message='邮箱与密码不匹配';
    return;
  }

  //存一个登录标识
  $_SESSION['current_login_user']=$user;

  header('Location:/admin/index.php');
}

if($_SERVER['REQUEST_METHOD']==='POST'){
  login();
}

// 退出功能
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action']) && $_GET['action'] === 'logout') {
  // 删除了登录标识
  unset($_SESSION['current_login_user']);
}

?>

<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>Sign in &laquo; Admin</title>
  <link rel="stylesheet" href="/static/assets/vendors/bootstrap/css/bootstrap.css">
  <link rel="stylesheet" href="/static/assets/vendors/animate/animate.css">
  <link rel="stylesheet" href="/static/assets/css/admin.css">
</head>
<body>
  <div class="login">
    <form class="login-wrap<?php echo isset($message) ? ' shake animated' : '' ?>" action="<?php echo $_SERVER['PHP_SELF']?>" method="post" novalidate autocomplete="off">
      <img class="avatar" src="/static/assets/img/default.png">

      <!-- 有错误信息时展示 -->
      <?php if(isset($message)):?>
      <div class="alert alert-danger">
        <strong>错误!</strong><?php echo $message; ?>
      </div>
      <?php endif;?>

      <div class="form-group">
        <label for="email" class="sr-only">邮箱</label>
        <input id="email" name="email" type="email" class="form-control" placeholder="邮箱" autofocus value="<?php echo empty($_POST['email'])?'':$_POST['email'] ?>">
      </div>
      <div class="form-group">
        <label for="password" class="sr-only">密码</label>
        <input id="password" name="password" type="password" class="form-control" placeholder="密码">
      </div>
      <button class="btn btn-primary btn-block">登 录</button>
    </form>
  </div>
  <script src="/static/assets/vendors/jquery/jquery.js"></script>
  <script>
    $(function ($) {

      // TODO：在用户输入自己的邮箱过后，页面上展示这个邮箱对应的头像
      // 时机：邮箱文本框失去焦点，并且能够拿到文本框中填写的邮箱时
      var emailFormat = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/;

      $('#email').on('blur', function () {
        var value = $(this).val();
        // 忽略掉文本框为空或者不是一个邮箱
        if (!value || !emailFormat.test(value)) return;

      // 事情：获取这个文本框中填写的邮箱对应的头像地址，展示到上面的 img 元素上
        $.get('/admin/api/avatar.php', { email: value }, function (res) {
          // 希望 res => 这个邮箱对应的头像地址
          if (!res) return;
          // 展示到上面的 img 元素上
          // $('.avatar').fadeOut().attr('src', res).fadeIn()
          $('.avatar').fadeOut(function () {
            // 等到 淡出完成
            $(this).on('load', function () {
              // 图片完全加载成功过后
              $(this).fadeIn();
            }).attr('src', res);
          });
        });
      });
    });
  </script>
</body>
</html>