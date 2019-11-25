<?php
require_once '../functions.php';

get_curr_user();
 ?>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>Comments &laquo; Admin</title>
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
        <h1>所有评论</h1>
      </div>
      <!-- 有错误信息时展示 -->
      <!-- <div class="alert alert-danger">
        <strong>错误！</strong>发生XXX错误
      </div> -->
      <div class="page-action">
        <!-- show when multiple checked -->
        <div class="btn-batch" style="display: none">
          <button class="btn btn-info btn-sm">批量批准</button>
          <button class="btn btn-warning btn-sm">批量拒绝</button>
          <button class="btn btn-danger btn-sm">批量删除</button>
        </div>
        <ul class="pagination pagination-sm pull-right"></ul>
      </div>
      <table class="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th class="text-center" width="40"><input type="checkbox"></th>
            <th>作者</th>
            <th>评论</th>
            <th>评论在</th>
            <th>提交于</th>
            <th>状态</th>
            <th class="text-center" width="150">操作</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    </div>
  </div>

   <?php include 'inc/sidebar.php'; ?>

  <script src="/static/assets/vendors/jquery/jquery.js"></script>
  <script src="/static/assets/vendors/bootstrap/js/bootstrap.js"></script>
  <script src="/static/assets/vendors/jsrender/jsrender.js"></script>
  <script src="/static/assets/vendors/twbs-pagination/jquery.twbsPagination.js"></script>
  <script id="comments_tmpl" type="text/x-jsrender">
    {{for comments}}
    <tr{{if status == 'held'}} class="warning"{{else status == 'rejected'}} class="danger"{{/if}} data-id="{{:id}}">
      <td class="text-center"><input type="checkbox"></td>
      <td>{{:author}}</td>
      <td>{{:content}}</td>
      <td>{{:post_title}}</td>
      <td>{{:created}}</td>
      <td>{{:status}}</td>
      <td class="text-center">
        {{if status == 'held'}}
        <a href="post-add.html" class="btn btn-info btn-xs">批准</a>
        <a href="post-add.html" class="btn btn-warning btn-xs">拒绝</a>
        {{/if}}
        <a href="javascript:;" class="btn btn-danger btn-xs btn-delete">删除</a>
      </td>
   </tr>
    {{/for}}
  </script>

  <script>


  var currentPage=1;
  function loadPageData(page){

    $('tbody').fadeOut();
    //发送AJAX请求获取列表所需数据
    $.get('/admin/api/comments.php',{ page: page},function(data){
      if(page>data.total_pages){
        loadPageData(data.total_pages);
        return;
      }
      $('.pagination').twbsPagination('destroy');
      $('.pagination').twbsPagination({
        first:'...',
        last:'...',
        prev:'&lt',
        next:'&gt',
        startPage:page,
        totalPages:data.total_pages,
        visiablePages:5,
        initiateStartPageClick:false,
        onPageClick:function (e,page){
          //第一次初始化时就会被触发一次
          loadPageData(page);
        }
      });
      //请求得到响应过后自动执行
      //将数据渲染到页面上
       var html=$('#comments_tmpl').render({comments:data.comments});
      $('tbody').html(html).fadeIn();
      currentPage=page;
    });
  }

  $('.pagination').twbsPagination({
        first:'...',
        last:'...',
        prev:'&lt',
        next:'&gt',
        // totalPages:data.total_pages,
        totalPages:100,
        visiablePages:5,
        // initiateStartPageClick:false,
        onPageClick:function (e,page){
          //第一次初始化时就会被触发一次
          loadPageData(page);
        }
      });
  // loadPageData(currentPage);


  //删除功能======================================================
  //由于删除按钮是动态添加的，而执行动态添加的代码是在此之后执行的，过早注册不上所以不能直接给删除按钮添加事件

  $('tbody').on('click','.btn-delete',function(){
    var $tr = $(this).parent().parent();
    //1.拿到需要删除的数据id
    var id=$tr.data('id');
    //2.发送一个AJAX请求告诉服务器要删除那一条具体的数据
    $.get('/admin/api/comment-delete.php',{id:id},function (res){
      //3.根据服务器返回的删除是否成功决定是否在界面上移除这个元素
      if(!res) return;
      //重新再载入当前这一页的数据
      loadPageData(currentPage);
    });


  });

  </script>
  <script>NProgress.done();</script>
</body>
</html>
