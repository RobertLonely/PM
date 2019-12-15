<template>
  <div class="newinfo">
    <!-- 大标题 -->
    <h3>{{newInfo.title}}</h3>
    <!-- 子标题 -->
    <p>
      <span>发布时间：{{newInfo.add_time | dateF}}</span>
      <span>点击：{{newInfo.click}}次</span>
    </p>
     <!-- 内容区域 -->
    <div v-html="newInfo.content"></div>
    <!-- 评论子组件区域 -->
    <comment></comment>
  </div>
</template>

<script>
//导入评论子组件
import comment from "../subComponents/comment.vue";
export default {
  data() {
    return {
      // 将 URL 地址中传递过来的 Id值，挂载到 data上，方便以后调用
      id: this.$route.params.id,
      newInfo: []// 新闻对象
    };
  },
  created() {
    this.getNew();
  },
  methods: {
    getNew() {// 获取新闻详情
      this.$http.get("api/getnew/" + this.id).then(res => {
        if (res.body.status === 0) {
          this.newInfo = res.body.message[0];
          // console.log(this.newInfo);
        } else {
          Toast("加载新闻失败...");
        }
      });
    }
  },
  components: {//用来注册子组件的节点
    comment
  }
};
</script>

<style lang="less" scoped>
.newinfo {
  padding: 4px 4px 0;
  h3 {
    text-align: center;
    font-size: 16px;
  }
  p {
    padding: 8px 10px;
    border-bottom: 1px dashed #ccc;
    display: flex;
    justify-content: space-between;
    color: lightseagreen;
  }
}
</style>