<template>
  <div>
    <!-- 图片详情部分 -->
    <div class="details">
      <h3>{{item.title}}</h3>
      <p>
        <span>发表时间:{{item.add_time | dateF}}</span>
        <span>点击:{{item.click}}次</span>
      </p>

      <div class="litimg">
        <vue-preview :slides="slide1" @close="handleClose"></vue-preview>
      </div>

      <div class="content" v-html="item.content"></div>
    </div>
    <!-- 评论部分 -->
    <comment></comment>
  </div>
</template>

<script>
import comment from "../subComponents/comment.vue";
export default {
  data() {
    return {
      id: this.$route.params.id,
      slide1: [],
      item: []
    };
  },
  created() {
    this.getInfo();
    this.getLitImg();
  },
  methods: {
    getInfo() {
      this.$http.get("api/getimageInfo/" + this.id).then(res => {
        if (res.body.status === 0) {
          this.item = res.body.message[0];
        }
      });
    },
    getLitImg() {
      this.$http.get("api/getthumimages/" + this.id).then(res => {
        if (res.body.status === 0) {
          res.body.message.forEach(item => {
            item.w = 600;
            item.h = 400;
            item.msrc = item.src;
          });
          this.slide1 = res.body.message;
          console.log(this.slide1);
        }
      });
    },
    handleClose() {
      console.log("close event");
    }
  },
  components: {
    comment
  }
};
</script>

<style lang="less">
.details {
  padding: 0 10px;
  h3 {
    font-size: 16px;
    font-weight: 800;
    color: #26a2ff;
    text-align: center;
    margin: 15px 0;
  }
  p {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px dashed #ccc;
    padding: 10px 0;
    font-size: 14px;
  }
  .litimg {
    overflow: hidden;
    figure {
      width: 100px;
      margin: 0 15px 15px 0;
      float: left;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
      img {
        width: 100px;
      }
    }
  }
  .content {
    line-height: 30px;
  }
}
</style>