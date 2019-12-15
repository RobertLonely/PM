<template>
  <div>
    <mt-swipe :auto="2000">
      <!-- 在组件中，使用v-for循环的话，一定要使用 key -->
      <!-- 将来谁使用此轮播图组件，谁为我们传递carousel -->
      <mt-swipe-item v-for="(item,i) in carousel" :key="i">
        <img :src="item.img" :class="{full:isfull}" alt />
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["carousel", "isfull"]
};
</script>

<style lang="less" scoped>
.mint-swipe {
  height: 200px;
  text-align: center;
  .mint-swipe-item {
    img {
      height: 100%;
    }
    .full {
      width: 100%;
    }
  }
}
</style>