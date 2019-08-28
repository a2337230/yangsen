<template>
  <div class="online">
    <header-box :title="title"></header-box>
    <div class="tabs">
      <div class="tab-menu">
        <span :class="{current: item.checked}" v-for="item in tabList" :key="item.title" @click="tabClick(item.id)">{{item.title}}</span>
        <div class="tab-line"></div>
      </div>
      <!-- <ul class="tab-menu" @mousedown="down" @touchstart="down" @touchmove="move">
        <li :class="{current: item.checked}" v-for="(item, index) in tabList" :key="item.title" @click="tabClick(index)">
          {{item.title}}
        </li>
      </ul> -->
      
    </div>
    <div class="online-container" style="padding: 0 .3rem;">
      <ul class="online-menu">
        <li v-for="item in onlineList" :key="item.CourseID" @click="goCourse(item)">
          <img :src="'https://img.xlxt.net' + item.Img" alt="">
          <p>{{item.Name}}</p>
        </li>
      </ul>
    </div>
    <div class="psd-dialog" v-if="isDialog" @click="isFocus">
      <div class="psd-box">
        <i class="close" @click="outBack"></i>
        <input type="text" class="psd-input" placeholder="请输入密码" v-model="psd">
        <p class="dialog" :class="{isShow: isShow}">密码错误</p>
        <div class="submit-btn" @click="submitPsd">确定</div>
      </div>
    </div>
  </div>
</template>
<script>
import HeaderBox from '@/components/Header'
import { shopArticle } from '@/api/index'
import util from '@/utils/util.js'
import { MessageBox } from 'mint-ui'
export default {
  name: 'online',
  data () {
    return {
      title: '线上赋能课程专区',
      tabList: [
        {
          id: 0,
          title: '店长/储备店长',
          checked: true,
          courseID: 511
        },
        {
          id: 1,
          title: '运营经理',
          checked: false,
          courseID: 512
        },
        {
          id: 2,
          title: 'HR',
          checked: false,
          courseID: 513
        },
        {
          id: 3,
          title: '采购/商品经理',
          checked: false,
          courseID: 514
        },
        {
          id: 4,
          title: '热点',
          checked: false,
          courseID: 515
        }
      ],
      onlineList: [],
      // 鼠标按下
      flags: false,
      startX: 0,
      moveX: 0,
      lineX: 0,
      tabs: 0,
      isDialog: false,
      isShow: false,
      lookId: 0,
      psd: '',
      isH5: false,
      isAndroid: false,
      isIos: false
    }
  },
  created () {
    this.user = util.getCookie('UserID') ? util.getCookie('UserID'): util.getCookie('u')
    // this.user = '2d001adc288acf01f432a157ec482dc7'
  },
  mounted () {
    var ua = navigator.userAgent.toLowerCase();
    let ios = ua.indexOf("native_app_ios") > -1
    let android = ua.indexOf("glaer-android") > -1
    if (ios) {
      this.isIos = true
    } else if (android) {
      this.isAndroid = true
    } else {
      this.isH5 = true
    }
    // 计算选项卡宽度
    let tabs = document.querySelector('.tab-menu')
    let tabItem = tabs.querySelectorAll('span')
    let mg = tabItem[1].offsetLeft - tabItem[0].offsetWidth
    let w = 0
    tabItem.forEach(item => {
      w += item.offsetWidth
    })
    tabs.style.width = w + mg * 5 + 10 + 'px'
    let tabID = localStorage.getItem('tabs')

    if (tabID) {
      this.tabs = Number(tabID)
      this.tabClick(tabID)
      this._shopArticle(this.tabList[tabID].courseID)
      return
    }
    this._shopArticle(511)
  },
  methods: {
    isFocus () {
      // let input = document.querySelector('.psd-input')
      // input.focus()
    },
    tabClick (index) {
      this.tabs = index
      localStorage.setItem('tabs', index)
      this.tabList.forEach(item => {
        if (item.id === index) {
          item.checked = true
        } else {
          item.checked = false
        }
      })
      let tabItem = document.querySelectorAll('span')[index]
      let line = document.querySelector('.tab-line')
      line.style.width = tabItem.offsetWidth + 'px'
      line.style.left = tabItem.offsetLeft + 'px'
    },
    goCourse (val) {
      if (this.isH5) {
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
      }
      
      this.lookId = val.CourseID 
      let psd = localStorage.getItem('isPsd')
      if (psd) {
        var ua = navigator.userAgent.toLowerCase();
        let ios = ua.indexOf("native_app_ios") > -1
        let android = ua.indexOf("glaer-android") > -1
        if(ios) {
           if (!this.user) {
            window.location.href = 'https://sso.xlxt.net/applogin/login.html?ReturnUrl=' + window.location.href
          } else {
            window.goCourseDetailsPage(this.lookId) 
          }
        }else if (android) {
           window.android.goCourseDetailsPage(this.lookId)
        } else {
          window.location.href = 'https://m.xlxt.net/Product/Course_Player.html?product_id=' + this.lookId +'&returnUrl=' + window.location.href
        }
        // window.location.href = 'https://m.xlxt.net/Product/Course_Player.html?product_id=' + this.lookId +'&returnUrl=' + window.location.href
      } else {
        this.pasTop()
      }
      // this.pasTop()
    },
    async _shopArticle (id) {
      let result = await shopArticle({
        newest:false,
        browseNum:false,
        reviewAvg:false,
        courseClassify:id,
        pagesize:9,
        pageindex:1,
        keyword: ''
      })
      this.onlineList = result.Data
    },
    pasTop () {
      this.isShow = false
      this.isDialog = true
      setTimeout(() => {
        let psd = document.querySelector('.psd-box')
        psd.classList.add('psdTop')
      }, 200)
    },
    submitPsd () {
      let input = document.querySelector('.psd-input')
      input.focus()
      let data = this.psd.replace(/\s/g,"")
      if (data == 'tfzx') {
        localStorage.setItem('isPsd', '1')
        this.isDialog = false
        var ua = navigator.userAgent.toLowerCase();
        let ios = ua.indexOf("native_app_ios") > -1
        let android = ua.indexOf("glaer-android") > -1
        if(ios) {
           if (!this.user) {
            window.location.href = 'https://sso.xlxt.net/applogin/login.html?ReturnUrl=' + window.location.href
          } else {
            window.goCourseDetailsPage(this.lookId) 
          }
        }else if (android) {
           window.android.goCourseDetailsPage(this.lookId)
        } else {
          window.location.href = 'https://m.xlxt.net/Product/Course_Player.html?product_id=' + this.lookId +'&returnUrl=' + window.location.href
        }
        
        // window.location.href = `https://m.xlxt.net/Product/ProductDetail.html?product_id=${this.lookId}&returnUrl=${window.location.href}`
      } else {
        this.isShow = true
      }
    },
    outBack () {
      this.isDialog = false
    }
  },
  watch: {
    tabs (val) {
      if (val === 0) {
        this._shopArticle(511)
      } else if (val === 1) {
        this._shopArticle(512)
      } else if (val === 2) {
        this._shopArticle(513)
      } else if (val === 3) {
        this._shopArticle(514)
      } else if (val === 4){
        this._shopArticle(515)
      }
    }
  },
  components: {
    HeaderBox
  }
}
</script>
<style lang="less" scoped>
.online {
  width: 100vw;
  overflow: hidden;
}
.tabs {
  width: calc(~"100vw - 0.3rem");
  margin-left: .3rem;
  margin-bottom: .3rem;
  box-sizing: border-box;
  // overflow: hidden;
  position: relative;
  overflow-x: scroll;
  .tab-menu {
    width: 500rem;
    display: flex;
    transition: .5s;
    padding-top: .2rem;
    padding-bottom: .2rem;
    position: relative;
    span {
      margin-right: .3rem;
      font-size: .3rem .42rem;
      color: #999;
      &:last-child {
        margin-right: 0;
      }
    }
    .current {
      color: #222;
    }
  }
  .tab-line {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 2rem;
    height: .08rem;
    // background-color: #000;
    border-radius: .2rem;
    transition: .3s;
    // position: relative;
    overflow: hidden;
    display: flex;
    justify-content: space-around;
    &::after {
      content: '';
      position: absolute;
      width: .6rem;
      height: 100%;
      border-radius: .2rem;
      background-color: #000;
    }
  }
}
.online-menu {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  li {
    width: 3.3rem;
    // height: 4rem;
    border-radius: .2rem;
    box-shadow:0 .02rem .2rem 0 rgba(0,0,0,0.06);
    margin-bottom: .3rem;
    overflow: hidden;
    img {
      width: 100%;
      height: 1.6rem;
    }
    p {
      // text-align: center;
      font-size: .3rem;
      color:rgba(34,34,34,1);
      line-height: .42rem;
      font-weight: bold;
      line-height: .7rem;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      padding-left: .1rem;
    }
  }
}
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