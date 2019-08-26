<template>
  <div class="online">
    <header-box :title="title"></header-box>
    <div class="tabs">
      <ul class="tab-menu" @mousedown="down" @touchstart="down" @touchmove="move">
        <li :class="{current: item.checked}" v-for="(item, index) in tabList" :key="item.title" @click="tabClick(index)">
          {{item.title}}
        </li>
      </ul>
      <div class="tab-line"></div>
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
      title: '线上管理赋能课程专区',
      tabList: [
        {
          title: '店长/储备店长',
          checked: true
        },
        {
          title: '运营经理',
          checked: false
        },
        {
          title: 'HR',
          checked: false
        },
        {
          title: '采购/商品经理',
          checked: false
        },
        {
          title: '热点',
          checked: false
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
    // alert(ua)
    let ios = ua.indexOf("native_app_ios") > -1
    let android = ua.indexOf("glaer-android") > -1
    if (ios) {
      this.isIos = true
    } else if (android) {
      this.isAndroid = true
    } else {
      this.isH5 = true
    }
    let menu = document.querySelector('.tab-menu')
    let list = menu.querySelectorAll('li')
    let width = 0
    let l = 0
    let md = list[1].offsetLeft - list[0].offsetWidth - list[0].offsetLeft
    list.forEach(item => {
      width += item.clientWidth
    })
    let line = document.querySelector('.tab-line')
    line.style.transform = `translate(${list[0].offsetWidth / 2 - 15}px)`
    menu.style.width = width + md * 4 + 5 + 'px'
    this._shopArticle(511)
  },
  methods: {
    isFocus () {
      // let input = document.querySelector('.psd-input')
      // input.focus()
    },
    tabClick (index) {
      this.tabs = index
      this.tabList.forEach((item,zindex) => {
        if (zindex === index) {
          item.checked = true
          let l = document.querySelectorAll('.tab-menu li')[0].offsetLeft
          let ll = document.querySelector('.tabs').offsetLeft
          let tabItem = document.querySelectorAll('.tab-menu li')[index]
          let w = tabItem.offsetWidth
          let line = document.querySelector('.tab-line')
          let domW = document.documentElement.offsetWidth
          let patentBox = document.querySelector('.tab-menu')
          let toLeft = 0
          if (patentBox.clientWidth > domW) {
            if (index > 1) {
              patentBox.style.transform = `translateX(-${patentBox.clientWidth - domW + ll}px)`
              //  patentBox.style.height = '1000px'
              toLeft = (patentBox.clientWidth - domW) * -1 
            } else {
              toLeft = 0
              patentBox.style.transform = `translateX(0px)`
            }
          }
          if (line.offsetWidth > w) {
            line.style.width = w + 'px'
            line.style.transform = `translateX(${tabItem.offsetLeft + toLeft - ll}px)`
          } else {
            line.style.width = '.6rem'
            if (index < 2) {
              line.style.transform = `translateX(${tabItem.offsetLeft + w/2 - line.offsetWidth/2 + toLeft}px)`
              this.lineX = tabItem.offsetLeft + w/2 - line.offsetWidth/2 + toLeft
            } else {
              line.style.transform = `translateX(${tabItem.offsetLeft - ll + w/2 - line.offsetWidth/2 + toLeft}px)`
              this.lineX = tabItem.offsetLeft - ll + w/2 - line.offsetWidth/2 + toLeft
            }
          }
        } else {
          item.checked = false
        }
      })
    },
    down (e) {
      this.flags = true
      var touch;
      if(e.touches){
          touch = e.touches[0];
      }else {
          touch = e;
      }
      this.startX = touch.clientX
    },
    move (e) {
      // if (this.flags) {
      //   var touch;
      //   let move = 0
      //   if(e.touches){
      //       touch = e.touches[0];
      //   }else {
      //       touch = e;
      //   }
      //   move = touch.clientX - this.startX
      //   let menu = document.querySelector('.tab-menu')
      //   if (move > 10) {
      //     console.log('you')
      //   }
      //   if (move < -10) {
      //     console.log('z')
      //   }
      //   menu.style.transform = `translateX(${move}px)`
      //   console.log(move)
      //   // console.log(touch.clientX, this.startX)
      // }
    },
    goCourse (val) {
      // alert(this.isH5)
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
      // alert(psd)
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
          // alert(111)
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
      // alert(data.length)
      if (data == 'tfzx') {
        localStorage.setItem('isPsd', '1')
        // let psd = localStorage.getItem('isPsd')
      // alert(psd)
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
          // alert(111)
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
        this._shopArticle(515)
      } else if (val === 2) {
        this._shopArticle(513)
      } else if (val === 3) {
        this._shopArticle(514)
      } else {
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
  .tab-menu {
    width: 500rem;
    display: flex;
    transition: .5s;
    li {
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
    margin-top: .13rem;
    width: .6rem;
    height: .04rem;
    background-color: #000;
    border-radius: .08rem;
    border:1px solid rgba(151,151,151,1);
    transition: .2s;
    position: absolute;
    left: 0;
    bottom: -.2rem;
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