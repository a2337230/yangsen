<template>
  <div class="offline">
    <header-box :title="title"></header-box>
    <div class="off-join">
      <ul class="off-menu" v-if="offList.length > 0">
        <li v-for="item in offList" :key="item.time" @click="goArcitle(item.ArticleID)">
          <img :src="'https://img.xlxt.net/' + item.PreviewUrl" alt="">
          <p><span>{{item.Title}}</span> <span>{{item.AddTime | timeFormat}}</span></p>
        </li>
      </ul>
    </div>
    <div class="exp">
      <img src="./../../common/images/exp.png" alt="" style="width: 100%;">
    </div>
  </div>
</template>
<script>
import HeaderBox from '@/components/Header'
import { offArticle  } from '@/api/index'
import moment from 'moment'
export default {
  name: 'offline',
  data () {
    return {
      title: '线下赋能巡讲会集锦',
      defaultImg: require('./../../common/images/banner01.jpg'),
      offList: []
    }
  },
  mounted () {
    this._getArcitle()
  },
  methods: {
    goArcitle (arcitleID) {
      this.$router.push({
        path: '/offarcitle',
        query: {
          arcitleID,
          path: 'offline'
        }
      })
    },
    async _getArcitle () {
      let result = await offArticle()
      this.offList = result.Data
    }
  },
  filters: {
    timeFormat (val) {
      let time = val.substring(6, val.length - 2)
      return moment(Number(time)).format('YYYY-MM-DD')
    },
    titleFormat (val) {
      if (val.length > 18) {
        return val.substring(0, 18) + '...'
      }
      return val
    }
  },
  components: {
    HeaderBox
  }
}
</script>
<style lang="less" scoped>
.off-join {
  padding: .3rem;
  padding-bottom: 0;
  .off-menu {
    li {
      width: 100%;
      height: 3rem;
      border-radius: .2rem;
      box-shadow:0 .02rem .2rem 0 rgba(0,0,0,0.06);
      overflow: hidden;
      margin-bottom: .3rem;
      img {
        width: 100%;
        height: 2.32rem;
      }
      p {
        padding: 0 .2rem;
        font-size: .3rem;
        color:rgba(34,34,34,1);
        line-height: .7rem;
        box-sizing: border-box;
        position: relative;
        display: flex;
        justify-content: space-between;
        span {
          &:first-child {
            font-size: .26rem;
            width:5rem;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
          }
          &:last-child {
            font-size: .26rem;
          }
        }
      }
    }
  }
}
</style>