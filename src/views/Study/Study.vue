<template>
  <div class="resale">
    <header-box :title="title"></header-box>
    <div class="res-container">
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
  </div>
</template>
<script>
import HeaderBox from '@/components/Header'
import { studyArticle  } from '@/api/index'
export default {
  name: 'study',
  data () {
    return {
      title: '读书报告',
      resaleData: []
    }
  },
  created () {
    this._studyArticle()
  },
  methods: {
    async _studyArticle () {
      let result = await studyArticle()
      this.resaleData = result.Data
    },
    goArcitle (arcitleID) {
      this.$router.push({
        path: '/offarcitle',
        query: {
          arcitleID,
          path: 'study'

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
</style>