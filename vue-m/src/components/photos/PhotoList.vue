<template>
  <div class="photo">
    <!-- 顶部滑动条 -->
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a
            :class="['mui-control-item',item.id===0?'mui-active':'']"
            v-for="item in category"
            :key="item.id"
            @click="getPhotos(item.id)"
          >{{item.title}}</a>
        </div>
      </div>
    </div>

    <!-- 图片列表区域 -->
    <ul>
      <router-link v-for="item in list" :key="item.id" :to="'/Home/PhotoInfo/'+item.id" tag="li">
        <img v-lazy="item.img_url" />
        <div class="summary">
          <h3>{{item.title}}</h3>
          <span>{{item.zhaiyao}}</span>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
//导入MUI.js文件
import mui from "../../../lib/mui/js/mui.js";

export default {
  data() {
    return {
      category: [],
      list: []
    };
  },
  created() {
    this.getCategory();
    this.getPhotos(0);
  },
  mounted() {
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  methods: {
    getCategory() {
      this.$http.get("api/getimgcategory").then(res => {
        if (res.body.status === 0) {
          this.category = res.body.message;
          var all = { title: "全部", id: 0 };
          this.category.unshift(all);
        }
      });
    },
    getPhotos(classifyId) {
      this.$http.get("api/getimages/" + classifyId).then(res => {
        if (res.body.status === 0) {
          this.list = res.body.message;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.photo {
  touch-action: pan-y;

  ul {
    list-style: none;
    padding: 0 10px;
    li {
      margin-top: 10px;
      width: 100%;
      box-shadow: 0 0 9px rgba(0, 0, 0, 0.3);
      position: relative;
      img {
        width: 100%;
      }
      img[lazy="loading"] {
        width: 40px;
        height: 300px;
        margin: auto;
      }
      .summary {
        width: 100%;
        color: white;
        padding: 4px;
        background: rgba(0, 0, 0, 0.5);
        position: absolute;
        left: 0;
        bottom: 0;
        max-height: 90px;
        h3 {
          font-size: 15px;
          margin: 0;
          font-weight: 800;
          padding-bottom: 10px;
        }
        span {
          font-size: 12px;
        }
      }
    }
  }

  // img[lazy="loading"] {
  //   width: 40px;
  //   height: 300px;
  //   margin: auto;
  // }
}
</style>