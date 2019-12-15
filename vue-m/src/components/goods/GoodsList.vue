<template>
  <div class="goodlist">
    <ul>
      <li v-for="item in goodsList" :key="item.id" @click="goDetail(item.id)">
        <img :src="item.img_url" alt />
        <h3>{{item.title}}</h3>
        <div class="info">
          <p class="sale">
            <span>￥{{item.sell_price}}</span>
            <span>￥{{item.market_price}}</span>
          </p>
          <p class="hot">
            <span>热卖中</span>
            <span>剩{{item.stock_quantity}}件</span>
          </p>
        </div>
      </li>

      <!-- <li>
        <a href="#">
          <img
            src="https://img.alicdn.com/imgextra/i4/2104518373/O1CN01Xg46Kh2BisorymuCx_!!0-item_pic.jpg_430x430q90.jpg"
            alt
          />
          <h3>小米（Mi）小米Note 16G双网通版</h3>
          <div class="info">
            <p class="sale">
              <span>￥999</span>
              <span>￥889</span>
            </p>
            <p class="hot">
              <span>热卖中</span>
              <span>剩60件</span>
            </p>
          </div>
        </a>
      </li>-->

      <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
    </ul>
  </div>
</template>

<script>
export default {
  // data是往自己组件内部，挂载一些私有数据的
  data() {
    return {
      // 分页的页数
      pageIndex: 1,
      // 存放商品列表的数组
      goodsList: []
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      this.$http.get("api/getgoods?pageindex=" + this.pageIndex).then(res => {
        if (res.body.status === 0) {
          this.goodsList = this.goodsList.concat(res.body.message);
        }
      });
    },
    getMore() {
      this.pageIndex++;
      this.getGoodsList();
    },
    goDetail(id) {
      this.$router.push({ name: "detail", params: { id } });
    }
  }
};
</script>

<style lang="less" scoped>
.goodlist {
  ul {
    list-style: none;
    // padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    padding: 7px;
    justify-content: space-between;

    li {
      width: 178px;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
      margin-bottom: 10px;
      padding: 5px;

      img {
        width: 100%;
        height: auto;
      }
      h3 {
        font-weight: 800;
        font-size: 16px;
        margin: 10px 0;
        text-align: center;
        color: black;
        min-height: 70px;
      }
      .info {
        background-color: rgba(0, 0, 0, 0.1);
        padding: 0 5px;
        p {
          margin: 0;
          padding: 5px 0;
        }
        .sale {
          span:first-child {
            color: red;
            font-weight: 800;
            font-size: 18px;
          }
          span:last-child {
            font-size: 12px;
            text-decoration: line-through;
          }
        }
        .hot {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
        }
      }
    }
  }
}
</style>