<?php

// 根据客户端传递过来的ID删除对应数据

require_once '../../functions.php';

if (empty($_GET['id'])) {
  exit('缺少必要参数');
}

// $id = (int)$_GET['id'];防止sql注入
$id = $_GET['id'];

$rows = my_execute("delete from comments where id in ({$id})");

// header('Location: /admin/comments.php');

header('Content-Type: application/json');
echo json_encode($rows>0);
