<template>
  <div class="detail">
    <!-- 小球 -->
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>

    <!-- 轮播图区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <carousel :carousel="carousel" :isfull="false"></carousel>
        </div>
      </div>
    </div>
    <!-- 购买区域 -->
    <div class="mui-card">
      <div class="mui-card-header buy">{{info.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>
            市场价：
            <span>
              <del>￥{{info.market_price}}</del>
            </span>
            销售价：
            <span class="sell">￥{{info.sell_price}}</span>
          </p>

          <p>
            购买数量:
            <numBox :max="info.stock_quantity" @getCount="sum"></numBox>
          </p>

          <p>
            <mt-button type="primary">立即购买</mt-button>
            <mt-button type="danger" @click="addShopCart">加入购物车</mt-button>
          </p>
        </div>
      </div>
    </div>
    <!-- 商品参数区域 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{info.goods_no}}</p>
          <p>库存情况：{{info.stock_quantity}}</p>
          <p>上架时间：{{info.add_time | dateF}}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="goIntroduce(info.id)">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="goComment(info.id)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
// 导入轮播图组件
import carousel from "../subComponents/carousel.vue";
// 导入 数字选择框 组件
import numBox from "../subComponents/numBox.vue";
export default {
  data() {
    return {
      // 将路由参数对象中的 id 挂载到data方便后期调用
      id: this.$route.params.id,
      // 轮播图的数据
      carousel: [],
      // 获取到的商品的信息
      info: [],
      // 控制小球的隐藏和显示的标识符
      ballFlag: false,
      // 保存用户选中的商品数量，默认用户买1个
      count: 1
    };
  },
  created() {
    this.getCarousel();
    this.getInfo();
  },
  methods: {
    getCarousel() {
      this.$http.get("api/getthumimages/" + this.id).then(res => {
        if (res.body.status === 0) {
          // 先循环轮播图数组的每一项，为 item添加img属性，因为轮播图组件中，只认识item.img，不认识item.src
          res.body.message.forEach(item => {
            item.img = item.src;
          });
          this.carousel = res.body.message;
        }
      });
    },
    getInfo() {
      // 获取商品的信息
      this.$http.get("api/goods/getinfo/" + this.id).then(res => {
        if (res.body.status === 0) {
          this.info = res.body.message[0];
        }
      });
    },
    goIntroduce(id) {
      // 点击使用编程式导航跳转到 图文介绍页面
      this.$router.push({ name: "introduce", params: { id } });
    },
    goComment(id) {
      // 点击跳转到 评论页面
      this.$router.push({ name: "comment", params: { id } });
    },
    addShopCart() {
      // 添加到购物车
      this.ballFlag = !this.ballFlag;
      // 拼接出一个，要保存到 store 中 car 数组里的 商品信息对象
      var goodsInfo = {
        id: parseInt(this.id),
        count: this.count,
        price: this.info.sell_price,
        isSelect: true
      };
      // 调用 store 中的 mutations 来将商品加入购物车
      this.$store.commit("addToCar", goodsInfo);
    },
    beforeEnter(el) {
      el.style.transform = "translate(0,0)";
    },
    enter(el, done) {
      el.offsetWidth;
      //获取小球的位置
      var ballPosition = this.$refs.ball.getBoundingClientRect();

      //获取徽标的位置
      var badgePosition = document
        .getElementById("badge")
        .getBoundingClientRect();
      var x = badgePosition.left - ballPosition.left;
      var y = badgePosition.top - ballPosition.top;
      el.style.transform = `translate(${x}px,${y}px)`;
      el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)";
      done();
    },
    afterEnter(el) {
      this.ballFlag = !this.ballFlag;
    },
    sum(num) {
      // 当子组件把 选中的数量传递给父组件的时候，把选中的值保存到 data 上
      this.count = num;
    }
  },
  components: {
    carousel,
    numBox
  }
};
</script>

<style lang="less" >
.detail {
  background-color: #eee;
  overflow: hidden;
  .buy {
    min-height: 68px;
  }
  .sell {
    color: red;
    font-size: 20px;
    font-weight: bold;
  }
  .mui-card-footer {
    display: block;
    button {
      margin: 15px 0;
    }
  }
  .ball {
    width: 15px;
    height: 15px;
    background-color: red;
    position: absolute;
    border-radius: 50%;
    z-index: 999;
    top: 420px;
    left: 142px;
  }
}
</style>