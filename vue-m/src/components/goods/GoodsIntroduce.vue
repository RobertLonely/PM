<template>
  <div class="introduce">
    <h3>{{list.title}}</h3>
    <p v-html="list.content"></p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      // 图文数据
      list: []
    };
  },
  created() {
    this.getIntroduce();
  },
  methods: {
    getIntroduce() {
      this.$http.get("api/goods/getdesc/" + this.id).then(res => {
        if (res.body.status === 0) {
          this.list = res.body.message[0];
        }
      });
    }
  }
};
</script>

<style lang="less">
.introduce {
  padding: 10px;
  h3 {
    padding-bottom: 10px;
    border-bottom: 1px dashed #ccc;
    font-weight: 800;
    font-size: 18px;
    text-align: center;
  }
  img {
    width: 100%;
  }
}
</style>