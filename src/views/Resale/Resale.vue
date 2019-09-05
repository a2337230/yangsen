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
            <p>{{item.Intro}}</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="no-data" v-else>暂无数据</div>
  </div>
</template>
<script>
import HeaderBox from '@/components/Header'
import { retailArticle  } from '@/api/index'
export default {
  name: 'resale',
  data () {
    return {
      title: '零售峰会点亮行动',
      resaleData: []
    }
  },
  created () {
    this._resaleArticle()
  },
  methods: {
    async _resaleArticle () {
      let result = await retailArticle()
      this.resaleData = result.Data
    },
    goArcitle (arcitleID) {
      this.$router.push({
        path: '/offarcitle',
        query: {
          arcitleID,
          path: 'resale'

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
      // margin-bottom: .3rem;
      font-weight: 500;
      color: #333;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    p {
      font-size: .26rem;
      color: #999;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
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