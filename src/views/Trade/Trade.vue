<template>
  <div class="resale">
    <header-box :title="title"></header-box>
    <div class="res-container" v-if="resaleData.length > 0">
      <ul class="retail-menu">
        <li class="retail-list" v-for="(item,index) in resaleData" :key="index" @click="goArcitle(item.ArticleID)">
          <div class="img-left">
            <img :src="'https://img.xlxt.net' + item.PreviewUrl" alt="">
          </div>
          <div class="right-des"> 
            <h3>{{item.Title}}</h3>
            <p>{{item.Intro | desFormat}}</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="no-data" v-else>暂无数据</div>
  </div>
</template>
<script>
import HeaderBox from '@/components/Header'
import { tradeArticle } from '@/api/index'
export default {
  name: 'trade',
  data () {
    return {
      title: '行业报告',
      resaleData: []
    }
  },
  created () {
    this._tradeArticle()
  },
  methods: {
    async _tradeArticle () {
      let result = await tradeArticle()
      this.resaleData = result.Data
    },
    goArcitle (arcitleID) {
      this.$router.push({
        path: '/offarcitle',
        query: {
          arcitleID,
          path: 'trade'

        }
      })
    }
  },
  filters: {
    desFormat (val) {
      if (val.length > 25) {
        return val.substring(0, 25) + '...'
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
.res-container {
  padding: 0 .3rem;
  margin-bottom: .3rem;
}
.retail-list {
  width: 100%;
  padding-top: .3rem;
  display: flex;
  .img-left {
    width: 3.3rem;
    height: 2rem;
    img {
      width: 100%;
      height: 100%;
      border-radius: .2rem;
    }
  }
  .right-des {
    flex: 1;
    padding-left: .2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    h3 {
      font-weight: normal;
      font-size: .3rem;
      margin-bottom: .3rem;
      font-weight: 500;
      color: #333;
    }
    p {
      font-size: .26rem;
      color: #999;
      padding-bottom: .2rem;
    }
  }
}
.no-data {
  width: 2rem;
  text-align: center;
  margin: 2rem auto;
  color: #999;
  font-size: .26rem;
}
</style>