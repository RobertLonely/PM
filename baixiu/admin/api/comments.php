<?php
//接收客户端的AJAX请求，返回评论数据

//载入封装的所有函数
require_once '../../functions.php';

//取得客户端传递过来的页码
$page = empty($_GET['page'])  ? 1 : intval($_GET['page']);

$length=30;

//根据页码计算越过多少条
$offset=($page-1) * $length;

// 查询所有评论数据
$comments = my_fetch_all(sprintf('select
 comments.*,
 posts.title as post_title
from comments
inner join posts on comments.post_id = posts.id
order by comments.created desc
limit %d, %d', $offset, $length));
//由于复制产生的数据，导致created大量相同，渲染出规则页面

$total_count = my_fetch_one('select count(1) as count
	from comments
    inner join posts on comments.post_id = posts.id')['count'];
// 计算总页数
$total_pages = ceil($total_count / $length);


//网络之间传输的只能是字符串，序列化
$json=json_encode(array(
  'total_pages' => $total_pages,
  'comments' => $comments
));

//设置响应的响应体类型为json
header('Content-Type:application/json');

//响应给客户端
echo $json;


