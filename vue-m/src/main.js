//导入vue组件
import Vue from "vue";

//导入自定义my-mint.css文件
import './assets/css/my-mint.css' 

//导入路由的包
import VueRouter from "vue-router";
//安装路由
Vue.use(VueRouter);

//导入 vue-resource
import VueResource from "vue-resource";
//安装 vue-resource
Vue.use(VueResource);
// 设置请求的根路径
Vue.http.options.root = "http://www.liulongbin.top:3005/";
// 全局设置 post 时候表单数据格式组织形式   application/x-www-form-urlencoded
Vue.http.options.emulateJSON = true;

//导入vue-preview
import VuePreview from "vue-preview";
//安装vue-preview
Vue.use(VuePreview);

//导入vuex
import Vuex from "vuex";
//安装vuex
Vue.use(Vuex);
//先从本地存储中，把购物车的数据读出来，放到 store 中
var car = JSON.parse(localStorage.getItem("car") || "[]");
//创建一个store实例
var store = new Vuex.Store({
  state: {
    //将购物车中商品的数据，用一个数组存储起来,在car数组中存储一些商品的对象
    car: car
  },
  mutations: {
    addToCar(state, goodsInfo) {
      //默认购物车中，没有此类商品
      var flag = false;
      state.car.some(item => {
        if (item.id === goodsInfo.id) {
          item.count += goodsInfo.count;
          flag = !flag;
          return true;
        }
      });

      // 如果循环完毕，得到的flag还是false，则把商品数据直接push到购物车中
      if (!flag) {
        state.car.push(goodsInfo);
      }
      // 更新car之后，把car数组，存储到本地的localStorage 中
      localStorage.setItem("car", JSON.stringify(state.car));
    },
    upDataCount(state, goodsInfo) {
      // 修改购物车中商品的数量值
      state.car.some(item => {
        if (item.id === goodsInfo.id) {
          item.count = goodsInfo.count;
          return true;
        }
      });
      // 当修改完商品的数量，把最新的购物车数据，保存到本地存储中
      localStorage.setItem("car", JSON.stringify(state.car));
    },
    remove(state, id) {
      // 根据Id，从store中的购物车中删除对应的那条商品数据
      state.car.some((item, i) => {
        if (item.id === id) {
          state.car.splice(i, 1);
          return true;
        }
      });
      // 将删除完毕后的，最新的购物车数据，同步到本地存储中
      localStorage.setItem("car", JSON.stringify(state.car));
    },
    changeSel(state, goodsInfo) {
      state.car.some(item => {
        if (item.id === goodsInfo.id) {
          item.isSelect = goodsInfo.isSelect;
          return true;
        }
      });
      // 把最新的所有购物车商品的状态保存到 store 中去
      localStorage.setItem("car", JSON.stringify(state.car));
    }
  },
  getters: {
    //获得所有商品的总和
    getAllCount(state) {
      var c = 0;
      state.car.forEach(item => {
        c += item.count;
      });
      return c;
    },
    //获得数字框出初始化值
    getInitCount(state) {
      var obj = {};
      state.car.forEach(item => {
        obj[item.id] = item.count;
      });
      return obj;
    },
    //获得选择框的选中状态
    getSelect(state) {
      var selectObj = {};
      state.car.forEach(item => {
        selectObj[item.id] = item.isSelect;
      });
      return selectObj;
    },
    //获得总件数和总价
    getCountAndPrice(state) {
      var CountAndPrice = {
        count: 0,  // 勾选的数量
        price: 0   // 勾选的总价
      };
      state.car.forEach(item => {
        if (item.isSelect) {
          CountAndPrice.count += item.count;
          CountAndPrice.price += item.price * item.count;
        }
      });
      return CountAndPrice;
    }
  }
});

// 导入格式化时间的插件
import moment from "moment";
//定义全局过滤器
Vue.filter("dateF", function(dateStr, pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(dateStr).format(pattern);
});

//导入Mint-UI全部组件
import MintUI from "mint-ui";
import "mint-ui/lib/style.css";
Vue.use(MintUI);

//导入 MUI 的样式
import "../lib/mui/css/mui.css";
// 导入扩展图标样式
import "../lib/mui/css/icons-extra.css";

//导入bootstrap样式
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

//导入 App 根组件
import App from "./App.vue";

//导入自己的 router.js 路由模块
import router from "./router.js";

//创建一个vm实例，使用render函数渲染指定组件
var vm = new Vue({
  el: "#app",
  //使用render函数渲染页面
  render: c => c(App),
  //挂载路由对象到 VM 实例上
  router,
  //挂载store到VM实例上
  store
});
