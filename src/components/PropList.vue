<template>
  <ul class="prop-menu">
    <li class="prop-list" v-for="(item, index) in prople" :key="item.name" @click="goLeader(index)">
      <div class="avatar">
        <img :src="item.avatar" alt="">
      </div>
      <div class="peo-des">
        <p class="name">{{item.name}}</p>
        <span>{{item.des}}</span>
      </div>
      <!-- <div class="go-peo">
        <img src="./../common/images/goright.png" alt="">
      </div> -->
    </li>
  </ul>
</template>
<script>
export default {
  name: 'prop',
  props: {
    prople: {
      type: Array,
      default: () => { return [] }
    }
  },
  methods: {
    goLeader (index) {
      this.$router.push({
        path: '/leaderInfo',
        query: {
          id: index,
          path: this.prople.length === 3 ? 'tengfei' : 'leader'
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.prop-menu {
  .prop-list {
    height: 1.68rem;
    border-bottom: 1px solid #d2d2d2;
    display: flex;
    align-items: center;
    position: relative;
    .avatar {
      width: 1.1rem;
      height: 1.1rem;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .peo-des {
      margin-left: .2rem;
      display: flex;
      flex-direction: column;
      .name, span {
        font-size: .3rem;
        line-height: .42rem;
        color: #222;
        font-weight: bold;
      }
      .name {
        margin-bottom: .08rem;
      }
      span {
        padding-top: .1rem;
        font-size: .24rem;
        color: #444;
        font-weight: normal;
      }
    }
    .go-peo {
      position: absolute;
      right: 0;
      width: .5rem;
      height: .5rem;
      text-align: right;
      img {
        width: .23rem;
        height: .4rem;
        position: relative;
        top: .05rem;
      }
    }
  }
}
</style>