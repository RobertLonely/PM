<template>
  <div class="comments">
    <h3>发表评论:</h3>
    <textarea rows="4" placeholder="请输入评论内容" v-model="msg"></textarea>
    <mt-button type="primary" size="large" @click="postComment">提交内容</mt-button>

    <div class="panel panel-info" v-for="(item,i) in comments" :key="i">
      <div class="panel-heading">
        <span>第{{i+1}}楼</span>
        <span>{{item.user_name}}</span>
        <span>{{item.add_time | dateF}}</span>
      </div>
      <div class="panel-body">{{item.content}}</div>
    </div>

    <mt-button plain type="primary" size="large" @click="getMore">更多...</mt-button>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      pageIndex: 1, // 默认展示第一页数据
      id: this.$route.params.id, // 所有的评论数据
      comments: [],
      msg: ""
    };
  },
  created() {
    this.getComment();
  },
  methods: {
    getComment() {
      this.$http
        .get("api/getcomments/" + this.id + "?pageindex=" + this.pageIndex)
        .then(res => {
          if (res.body.status === 0) {
            // 每当获取新评论数据的时候，以老数据拼接上新数据
            this.comments = this.comments.concat(res.body.message);
            // console.log(this.comments);
          } else {
            Toast("加载评论失败...");
          }
        });
    },
    getMore() {
      // 加载更多
      this.pageIndex++;
      this.getComment();
    },
    postComment() {
      if (this.msg.trim().length === 0) {
        Toast("评论不能为空");
      } else {
        var userObj = {
          user_name: "Lee",
          add_time: Date.now(),
          content: this.msg.trim()
        };
      }
      this.$http.post("api/postcomment/" + this.id, userObj).then(res => {
        if (res.body.status === 0) {
          this.comments.unshift(userObj);
          this.msg = "";
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.comments {
  h3 {
    padding: 20px 0 4px;
    border-top: 1px dashed #ccc;
    font-size: 16px;
  }
  textarea {
    font-size: 14px;
    margin: 0;
  }
  .mint-button {
    margin: 10px 0;
  }
  .panel {
    margin-bottom: 2px;
    .panel-heading {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>