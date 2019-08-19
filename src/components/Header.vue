<template>
  <div class="header-container">
    <header class="header">
      <div class="back" @click="goBack">
        <img src="./../common/images/back.png" alt="">
      </div>
      {{title}}
    </header>
  </div>
</template>
<script>
export default {
  name: 'Headers',
  props: {
    title: {
      type: String,
      default: '活动介绍'
    }
  },
  methods: {
    goBack () {
      console.log(this.$route.fullPath)
      let url = this.$route.fullPath
      if (url === '/tengfei') {

      } else if (url === '/leader' || url === '/online' || url === '/offline' || url === '/resale' || url === '/study' || url === '/trade') {
        this.$router.push('/tengfei')
      } else if (url === '/offarcitle') {
        this.$router.push('/offline')
      }
    }
  }
}
</script>
<style lang="less" scoped>
.header {
  position: fixed;
  width: 100%;
  height: .88rem;
  text-align: center;
  line-height: .88rem;
  font-size: .36rem;
  font-weight: 500;
  background-color: #fff;
  // font-family: 'pingfang sc';
  .back {
    position: absolute;
    width: .88rem;
    height: .88rem;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: .22rem;
      height: .4rem;
    }
  }
}
.header-container {
  height: .88rem;
  position: relative;
  z-index: 99999;
}
</style>
