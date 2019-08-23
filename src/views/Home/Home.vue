<template>
  <div class="home">
    <!-- 头部 -->
    <header-box :title="title"></header-box>
    <!-- 轮播图 -->
    <div class="banner">
      <swiper :imgs="banner"></swiper>
    </div>
    <!-- 卡片区域 -->
    <ul class="card-box">
      <router-link tag="li" to="/leader">
        <img src="./../../common/images/card1.png" alt="">
      </router-link>
      <router-link tag="li" to="/online">
        <img src="./../../common/images/card2.png" alt="">
      </router-link>
      <router-link tag="li" to="/offline">
        <img src="./../../common/images/card3.png" alt="">
      </router-link>
      <router-link tag="li" to="/resale">
        <img src="./../../common/images/card4.png" alt="">
      </router-link>
    </ul>
    <!-- 视频导航图片 -->
    <div class="go-video" @click="goVideo">
      <img src="./../../common/images/homeAd.png" alt="">
    </div>
    <!-- 领军人物 -->
    <div class="content">
      <div class="person pd30">
        <h2 class="home-title">区域连锁领军人物风采榜 <router-link tag="span" to="/leader">更多</router-link></h2>
        <prop-list :prople="popList"></prop-list>
      </div>
      <div class="person pd30">
        <h2 class="home-title">线上管理赋能课程专区 <router-link tag="span" to="/online">更多</router-link></h2>
        <p>县城TOP客户专享</p>
        <ul class="per-card">
          <li @click="goTop(723)">
            <img src="https://img.xlxt.net/QAupload/LMS/Course_img/2018/5/24/73d3a95978ca4cbc9aae524611121235.jpg" alt="">
            <p>呼吸系统疾病-咳嗽</p>
          </li>
          <li @click="goTop(2593)">
            <img src="https://img.xlxt.net/QAupload/LMS/Course_img/2018/5/16/1f7250fc7149483ebd8a020a543cd9bf.jpg" alt="">
            <p>温湿度表记录</p>
          </li>
          <li @click="goTop(2679)">
            <img src="https://img.xlxt.net/QAupload/LMS/Course_img/2018/5/29/f001019018ba4de1981f139b05a16b54.jpg" alt="">
            <p>店面形象与清洁</p>
          </li>
          <li @click="goTop(2674)">
            <img src="https://img.xlxt.net/QAupload/LMS/Course_img/2018/7/12/3d51ebf058d3496c8c21a818cc710254.jpg" alt="">
            <p>中药区铡刀操作</p>
          </li>
        </ul>
      </div>
      <div class="person pd30" style="padding-bottom: 0">
        <h2 class="home-title">线下赋能巡讲会集锦 <router-link tag="span" to="/offline">更多</router-link></h2>
        <ul class="patrol-menu"  v-if="offArr.length > 0">
          <li class="patrol-list isimg" v-for="item in offArr" :key="item.ArticleID" @click="goOffArcitle(item.ArticleID)">
            <div class="prtrol-img">
              <img :src="'https://img.xlxt.net/' + item.PreviewUrl" alt="">
            </div>
            <p>{{item.Title | titleFormat}}<span>{{item.AddTime | timeFormat}}</span></p>
          </li>
        </ul>
      </div>
      <div class="person pd30" style="padding-bottom: .38rem">
        <h2 class="home-title">零售峰会点亮行动 <router-link tag="span" to="/resale">更多</router-link></h2>
        <ul class="retail-menu"  v-if="resaleArr.length > 0">
          <li class="retail-list" v-for="item in resaleArr" :key="item.ArticleID" @click="goResaleArcitle(item.ArticleID)">
            <div class="img-left">
              <img :src="'https://img.xlxt.net' + item.PreviewUrl" alt="">
            </div>
            <div class="right-des">
              <h3>{{item.Title}}</h3>
              <p>{{item.Intro | resTitleFormat}}</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="person pd30" style="padding-bottom: 0">
        <h2 class="home-title">智慧分享</h2>
        <p>县城TOP客户分享</p>
        <ul class="wisdom">
          <router-link tag="li" to="/study">
            <img src="./../../common/images/zh.png" alt="">
            <p>读书报告</p>
          </router-link>
          <router-link tag="li" to="/trade">
            <img src="./../../common/images/ks.png" alt="">
            <p>行业报告</p>
          </router-link>
        </ul>
      </div>
    </div>
    <video-box v-if="isVideo" @cliseVideo="cliseVideo"></video-box>
    <div class="psd-dialog" v-if="isDialog">
      <div class="psd-box">
        <i class="close" @click="outBack"></i>
        <input type="text" class="psd-input" placeholder="请输入密码" v-model="psd">
        <p class="dialog" :class="{isShow: isShow}">密码错误</p>
        <button class="submit-btn" @click="submitPsd">确定</button>
      </div>
    </div>
  </div>
</template>
<script>
import HeaderBox from '@/components/Header'
import Swiper from '@/components/Swiper'
import PropList from '@/components/PropList'
import VideoBox from '@/components/Video'
import { offArticle, retailArticle } from '@/api/index'
import prople from './../../common/JS/prople'
import moment from 'moment'
import util from '@/utils/util.js'
import { MessageBox } from 'mint-ui';
export default {
  name: 'Home',
  data () {
    return {
      // 头部
      title: '活动介绍',
      // 轮播图数据
      banner: [
        {
          img: require('./../../common/images/banner01.jpg')
        },
        {
          img: require('./../../common/images/banner02.jpg')
        },
        {
          img: require('./../../common/images/banner03.jpg')
        },
        {
          img: require('./../../common/images/banner04.jpg')
        }
      ],
      // 人物数据
      popList: [],
      offArr: [],
      resaleArr: [],
      isVideo: false,
      isDialog: false,
      isShow: false,
      lookId: 0,
      psd: '',
      user: ''
    }
  },
  created () {
    let popData = prople.prople()
    popData.length = 3
    this.popList = popData
    window.scrollTo(0,0)
    this.user = util.getCookie('UserID') ? util.getCookie('UserID'): util.getCookie('u')
    // this.user = '2d001adc288acf01f432a157ec482dc7'
  },
  mounted() {
    this.offArc()
    this.resaleArc()
  },
  methods: {
    // 线下
    async offArc () {
      let result = await offArticle ()
      let data = result.Data
      if (data.length > 2) {
        data.length = 2
      }
      this.offArr = data
    },
    // 零售
    async resaleArc () {
      let result = await retailArticle()
      let data = result.Data
      if (data.length > 2) {
        data.length = 2
      }
      this.resaleArr = data
    },

    goVideo () {
      this.isVideo = true
    },
    cliseVideo () {
      this.isVideo = false
    },
    goOffArcitle (arcitleID) {
      this.$router.push({
        path: '/offarcitle',
        query: {
          arcitleID,
          type: 'off',
          path: 'tengfei'
        }
      })
    },
    goResaleArcitle (arcitleID) {
      this.$router.push({
        path: '/offarcitle',
        query: {
          arcitleID,
          type: 'off',
          source: 'resale',
          path: 'tengfei'
        }
      })
    },
    goTop (id) {
      if (!this.user) {
        MessageBox({
          title: '提示',
          message: '登录后可以观看课程',
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: '登陆'
        }).then(action => {
          if (action === 'confirm') {
            window.location.href = 'https://sso.xlxt.net/applogin/login.html?ReturnUrl=' + window.location.href
          }
        })
        return 
      }
      this.lookId = id
      let psd = localStorage.getItem('isPsd')
      if (psd) {
        window.location.href = 'https://m.xlxt.net/Product/Course_Player.html?product_id=' + this.lookId +'&returnUrl=' + window.location.href
      } else {
        this.pasTop()
      }
      // window.location.href = `https://m.xlxt.net/Product/ProductDetail.html?product_id=${id}&returnUrl=${window.location.href}`
    },
    pasTop () {
      this.isDialog = true
      setTimeout(() => {
        let psd = document.querySelector('.psd-box')
        psd.classList.add('psdTop')
      }, 200)
    },
    submitPsd () {
      if (this.psd.toLocaleLowerCase() === 'tfzx') {
        localStorage.setItem('isPsd', '1')
        this.isDialog = false
        window.location.href = 'https://m.xlxt.net/Product/Course_Player.html?product_id=' + this.lookId +'&returnUrl=' + window.location.href
        // window.location.href = `https://m.xlxt.net/Product/ProductDetail.html?product_id=${this.lookId}&returnUrl=${window.location.href}`
      } else {
        this.isShow = true
      }
    },
    outBack () {
      this.isDialog = false
    }
  },
  filters: {
    timeFormat (val) {
      let time = val.substring(6, val.length - 2)
      return moment(Number(time)).format('YYYY-MM-DD')
    },
    titleFormat (val) {
      if (val.length > 15) {
        return val.substring(0, 15) + '...'
      }
      return val
    },
    resTitleFormat (val) {
      if (val.length > 35) {
        return val.substring(0, 35) + '...'
      }
      return val
    }
  },
  components: {
    HeaderBox,
    Swiper,
    PropList,
    VideoBox
  }
}
</script>
<style lang="less" scoped>
.home {
  width: 100vw;
  .banner {
    width: calc(~"100vw - 0.6rem");
    margin: .1rem .3rem .1rem;
    border-radius: .2rem;
    overflow: hidden;
  }
  .card-box {
    margin: 0 .1rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    li {
      width: 3.6rem;
      height: 1.9rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .go-video {
    width: 7.13rem;
    height: 1.4rem;
    margin: .1rem auto;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .content {
    background:rgba(249,249,249,1);
    .person {
      background-color: #fff;
      padding-bottom: .4rem;
      margin-bottom: .16rem;
      .per-card {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        li {
          width: 3.3rem;
          // height: 2.48rem;
          padding-top: .18rem;
          img {
            width: 100%;
            height: 1.6rem;
            border-radius: .2rem;
          }
          p {
            font-size: .3rem;
            line-height: .42rem;
            padding: .13rem 0;
          }
        }
      }
    }
    .patrol-menu {
      padding-top: .3rem;
      .prtrol-img {
        width: 100%;
        height: 2rem;
        overflow: hidden;
        border-radius: .2rem;
      }
      img {
        width: 100%;
        // height: 2rem;
        // height: auto;
        border-radius: .2rem;
      }
      p {
        padding: .2rem 0;
        color: #222;
        font-size: .3rem;
        position: relative;
        span {
          position: absolute;
          right: 0;
        }
      }
    }
    .retail-list {
      width: calc(~"100vw - 0.6rem");
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
    .wisdom {
      display: flex;
      justify-content: space-between;
      padding-top: .2rem;
      padding-bottom: .7rem;
      img {
        width: 3.3rem;
        height: 1.6rem;
      }
      p {
        font-size: .3rem;
        color: #222;
        margin-top: .15rem;
      }
    }
  }
}

.home-title {
  font-size: .4rem;
  height: .56rem;
  padding-top: .4rem;
  position: relative;
  font-weight: 700;
  span {
    position: absolute;
    right: 0;
    font-size: .3rem;
    line-height: .56rem;
    font-weight: normal;
    color: #222;
  }
}
// .isimg {
//   height: 2rem;
//   overflow: hidden;
//   img {
//     width: 100% !important;
//     height: inherit !important;
//   }
// }
.psd-dialog {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,0.6);
  z-index: 99999;
  display: flex;
  justify-content: center;
  align-items: center;
  .psd-box {
    transform: translateY(500px);
    width: 6rem;
    height: 4.8rem;
    background-color: #fff;
    border-radius: .2rem;
    position: relative;
    transition: .2s cubic-bezier(.3,-0.03,.57,1.32);
    .close {
      position: absolute;
      right: 0;
      width: 1rem;
      height: 1rem;
      background: url('./../../common/images/close.png') no-repeat center center;
      background-size: .34rem .34rem;
    }
    .psd-input {
      width: 2.8rem;
      display: block;
      margin: 1.73rem auto 0rem;
      border: 0;
      text-align: center;
      font-size: .4rem;
      line-height: .56rem;
      padding-bottom: .05rem;
      border-bottom: 1px solid #999;
    }
    .submit-btn {
      display: block;
      margin: 0 auto;
      width: 4rem;
      height: .68rem;
      background-color: #2F54EB;
      border-radius: .34rem;
      text-align: center;
      font-size: .4rem;
      line-height: .68rem;
      color: #fff;
    }
  }
  .psdTop {
    transform: translateY(0)
  }
  .dialog {
    width: 2.8rem;
    display: block;
    margin: 0 auto;
    margin-bottom: 0.90rem;
    padding-top: .1rem;
    font-size: .3rem;
    color: red;
    opacity: 0;
  }
  .isShow {
    opacity: 1;
  }
}
</style>