<template>
  <div>
    <ul class="mui-table-view mui-table-view-chevron">
      <li class="mui-table-view-cell mui-media" v-for="item in newList" :key="item.id">
        <router-link class="mui-navigate-right" :to="'/Home/NewsList/'+item.id">
          <img class="mui-media-object mui-pull-left" :src="item.img_url" />
          <div class="mui-media-body">
            <h3>{{item.title}}</h3>
            <p class="mui-ellipsis">
              <span>发表时间：{{item.add_time | dateF}}</span>
              <span>点击：{{item.click}}次</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      newList: [] // 新闻列表
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {// 获取新闻列表
      this.$http.get("api/getnewslist").then(res => {
        if (res.body.status === 0) {
          this.newList = res.body.message;
        } else {
          Toast("加载失败...");
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.mui-media-body {
  h3 {
    font-size: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .mui-ellipsis {
    font-size: 11px;
    display: flex;
    justify-content: space-between;
  }
}
</style>