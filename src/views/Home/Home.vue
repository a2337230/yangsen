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
    <div class="go-video">
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
          <li>
            <img src="./../../common/images/banner01.jpg" alt="">
            <p>直播直播1111</p>
          </li>
          <li>
            <img src="./../../common/images/banner02.jpg" alt="">
            <p>直播直播1111</p>
          </li>
          <li>
            <img src="./../../common/images/banner03.jpg" alt="">
            <p>直播直播1111</p>
          </li>
          <li>
            <img src="./../../common/images/banner04.jpg" alt="">
            <p>直播直播1111</p>
          </li>
        </ul>
      </div>
      <div class="person pd30" style="padding-bottom: 0">
        <h2 class="home-title">线下赋能巡讲会集锦 <router-link tag="span" to="/offline">更多</router-link></h2>
        <ul class="patrol-menu">
          <li class="patrol-list isimg">
            <img src="./../../common/images/banner03.jpg" alt="">
            <p>泉源堂<span>2019-08-08</span></p>
          </li>
          <li class="patrol-list">
            <img src="./../../common/images/banner03.jpg" alt="">
            <p>聊城五州<span>2019-08-08</span></p>
          </li>
        </ul>
      </div>
      <div class="person pd30" style="padding-bottom: .38rem">
        <h2 class="home-title">零售峰会点亮行动 <router-link tag="span" to="/resale">更多</router-link></h2>
        <ul class="retail-menu">
          <li class="retail-list">
            <div class="img-left">
              <img src="./../../common/images/banner04.jpg" alt="">
            </div>
            <div class="right-des">
              <h3>文章标题</h3>
              <p>圣诞节萨拉丁阿迪达斯可点击撒旦教撒角度看撒剪短发的说法女星穿女明星农村V型曹</p>
            </div>
          </li>
          <li class="retail-list">
            <div class="img-left">
              <img src="./../../common/images/banner04.jpg" alt="">
            </div>
            <div class="right-des">
              <h3>文章标题</h3>
              <p>圣诞节萨拉丁阿迪达斯可点击撒旦教撒角度看撒剪短发的说法女星穿女明星农村V型曹</p>
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
  </div>
</template>
<script>
import HeaderBox from '@/components/Header'
import Swiper from '@/components/Swiper'
import PropList from '@/components/PropList'
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
      popList: [
        {
          avatar: require('./../../common/images/avatar.jpg'),
          name: '蜡笔小新',
          des: '野原新之助',
          path: ''
        },
        {
          avatar: require('./../../common/images/avatar1.jpg'),
          name: '课长广志',
          des: '野原广志',
          path: ''
        },
        {
          avatar: require('./../../common/images/avatar2.jpg'),
          name: '家庭主妇美伢',
          des: '野原美伢',
          path: ''
        }
      ]
    }
  },
  components: {
    HeaderBox,
    Swiper,
    PropList
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
      img {
        width: 100%;
        height: 2rem;
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
</style>