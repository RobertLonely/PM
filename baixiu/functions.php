<?php
require_once 'config.php';

//封装公用的函数
session_start();
//获取当前登录用户信息，如果没有获取到则自动跳转到登录页面
function get_curr_user() {
  if (empty($_SESSION['current_login_user'])) {
    // 没有当前登录用户信息，意味着没有登录
    header('Location: /admin/login.php');
    exit();
  }
  return $_SESSION['current_login_user'];
}

//通过一个数据库查询获取多条数据
function my_fetch_all ($sql) {
  $conn = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);
  if (!$conn) {
    exit('连接失败');
  }
  $query = mysqli_query($conn, $sql);
  if (!$query) {
    // 查询失败
    return false;
  }
  while ($row = mysqli_fetch_assoc($query)) {
    $result[] = $row;
  }
  mysqli_free_result($query);
  mysqli_close($conn);
  return $result;
}

// 获取单条数据
function my_fetch_one ($sql) {
  $res = my_fetch_all($sql);
  return isset($res[0]) ? $res[0] : null;
}

// 执行一个增删改语句
function my_execute ($sql) {
  $conn = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);
  if (!$conn) {
    exit('连接失败');
  }
  $query = mysqli_query($conn, $sql);
  if (!$query) {
    // 查询失败
    return false;
  }
  // 对于增删修改类的操作都是获取受影响行数
  $affected_rows = mysqli_affected_rows($conn);
  mysqli_close($conn);
  return $affected_rows;
}
