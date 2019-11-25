<?php
require_once '../functions.php';

get_curr_user();
 ?>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>Douban &laquo; Admin</title>
  <link rel="stylesheet" href="/static/assets/vendors/bootstrap/css/bootstrap.css">
  <link rel="stylesheet" href="/static/assets/vendors/font-awesome/css/font-awesome.css">
  <link rel="stylesheet" href="/static/assets/vendors/nprogress/nprogress.css">
  <link rel="stylesheet" href="/static/assets/css/admin.css">
  <script src="/static/assets/vendors/nprogress/nprogress.js"></script>
</head>
<body>
  <script>NProgress.start()</script>

  <div class="main">
    
    <?php include 'inc/navbar.php'; ?>

    <div class="container-fluid">
      <div class="page-title">
        <h1>最热音乐榜单</h1>
      </div>
      <ul id="music" class="list-unstyled"></ul>
    </div>
  </div>

  <?php include 'inc/sidebar.php'; ?>

  <script src="/static/assets/vendors/jquery/jquery.js"></script>
  <script src="/static/assets/vendors/bootstrap/js/bootstrap.js"></script>

  <!-- <script>
  	//script可以对不同源地址请求
  	function foo(res){
  		console.log(res);
  	}
  </script>
  <script src="https://api.apiopen.top/musicRankings?callback=foo"></script> -->
  <script>
  	$.ajax({
  		url:'https://api.apiopen.top/musicRankings',
  		// dataType:'jsonp',服务端返回的是json格式数据设置为jsonp会报错
  		success:function (res){
        var $res=res.result;
        var $ul=$('#music');
        for(var i=0;i<$res.length;i++){
          $ul.append($("<li><h4>"+$res[i].comment+"<h4></li>"));
          var $content=$res[i].content;

          for(var j=0;j<$content.length;j++){
          $ul.append($("<li>"+$content[j].album_title+"</li>"));
        }
        }

  		}
  	});

  </script>
  <script>NProgress.done()</script>
</body>
</html>
