<template>
  <div class="arcitle">
    <header-box :title="title"></header-box>
    <div class="arcitle-container">
      <div class="arcitle-video">
        <img src="./../../../common/images/videobg.jpg" alt="">
        <i class="video-btn"></i>
      </div>
      <div class="arcitle-content">
        <h1>{{ArcitleTitle}}</h1>
        <p class="arcitle-info">
          <span>杏林学堂</span>
          <span>浏览量：{{Hit}}</span>
          <span>时间： {{time | dateFormat}}</span>
        </p>
        <div class="content" v-html="content">
          我们都对“生病”有着与生俱来的恐惧，这种恐惧都是源于对“活着”的一种本能态度。《我不是药神》中那个白血病大妈握着警察的手说：哪一家多多少少会有病人啊。这无疑是一种对病患的最无力的摊牌。《我不是药神》有一种力量，这种力量在于医药与患者不能互成的矛盾上，在于现实给予求生欲的一记猛棍上，也在于法律与人情的互文上。<br/><br/>前段时间，一直被头晕所困扰，我妈非要让我去医院看看，于是挂了个号，做了个CT，然后被确诊为作息不规律而导致的脑供血不足。离开医院时，我跟我妈说我是有多久没来医院看过病了。紧接着，我妈立刻拉下脸，抄起手里的CT片子就往我脑袋上打，全然忘了我头晕的症状，调高了分贝，恶狠狠地怒斥我说：你真脑子坏了啊，好好地来医院遭什么罪。
        </div>
        <footer class="footer">
          <input type="text" placeholder="发表您的评论...">
          <div class="icon">
            <i class="zan"></i>
            <i class="zhuan"></i>
          </div>
        </footer>
        <div class="psd-dialog" v-if="isDialog">
          <div class="psd-box">
            <i class="close" @click="outBack"></i>
            <input type="text" class="psd-input" placeholder="请输入密码" v-model="psd">
            <p class="dialog" :class="{isShow: isShow}">密码错误</p>
            <button class="submit-btn" @click="submitPsd">确定</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import HeaderBox from '@/components/Header'
import { ArticleInfo1, ArticleInfo2 } from '@/api/index'
import util from '@/utils/util.js'
import moment from 'moment'
export default {
  name: 'OffArcitle',
  data () {
    return {
      title: '正文',
      isDialog: true,
      user: '',
      psd: '',
      isShow: false,
      arcitleID: this.$route.query.arcitleID,
      content: '',
      ArcitleTitle: '',
      Hit: 0,
      time: ''
    }
  },
  mounted () {
    setTimeout(() => {
      let psd = document.querySelector('.psd-box')
      psd.classList.add('psdTop')
    }, 200)
    this.user = util.getCookie('UserID') ? util.getCookie('UserID'): util.getCookie('u')
    console.log(this.user)
    this.getArt()
  },
  methods: {
    submitPsd () {
      console.log(this.psd.toLocaleLowerCase())
      if (this.psd.toLocaleLowerCase() === 'tfzx') {
        this.isDialog = false
      } else {
        this.isShow = true
      }
    },
    outBack () {
      this.$router.push('/offline')
    },
    getArt () {
      console.log(this.user)
      if (this.user) {
        this.getArcitle1()
      } else {
        this.getArcitle2()
      }
    },
    async getArcitle1 () {
      let result = await ArticleInfo1({
        articleid: this.arcitleID
      })
      this.ArcitleTitle = result.Data.Title
      this.content = result.Data.Content
      this.Hit = result.Data.Hits
      this.time = result.Data.AddTime
      this.isLike = result.Data.IsLike
    },
    async getArcitle2 () {
      let result = await ArticleInfo2({
        articleid: this.arcitleID
      })
      this.ArcitleTitle = result.Data.Title
      this.content = result.Data.Content
      this.Hit = result.Data.Hits
      this.time = result.Data.AddTime
      this.isLike = result.Data.IsLike
    }
  },
  filters: {
    dateFormat (val) {
      let time = val.substring(6, val.length - 2)
      return moment(Number(time)).format('YYYY-MM-DD')
    }
  },
  components: {
    HeaderBox
  }
}
</script>
<style lang="less" scoped>
.arcitle-container {
  padding: .3rem;
  .arcitle-video {
    height: 2.6rem;
    position: relative;
    img {
      border-radius: .2rem;
    }
    .video-btn {
      position: absolute;
      left: 50%;
      top: 50%;
      margin-left: -0.56rem;
      margin-top: -0.56rem;
      width: 1.12rem;
      height: 1.12rem;
      background: url('./../../../common/images/btn.png') no-repeat;
      background-size: 1.12rem 1.12rem;
    }
  }
  .arcitle-content {
    h1 {
      margin-top: .15rem;
      font-size: .5rem;
      line-height: .7rem;
    }
    .arcitle-info {
      font-size: .26rem;
      color: #848484;
      span {
        &:nth-of-type(2) {
          padding: 0 .5rem;
        }
      }
    } 
    .content {
      margin-top: .38rem;
      font-size: .30rem;
      line-height: .42rem;
      color: #333;
    }
  }
  
}
.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100vw;
  height: .98rem;
  background-color: #f9f9f9;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding-left: .42rem;
  input {
    width: 5.2rem;
    height: .68rem;
    background-color: #fff;
    border-radius: .34rem;
    padding-left: .4rem;
    box-sizing: border-box;
  }
  .icon {
    margin-left: .37rem;
    width: 1.2rem;
    display: flex;
    justify-content: space-between;
    i {
      display: inline-block;
      width: .5rem;
      height: .98rem;
    }
    .zan {
      background: url('./../../../common/images/zan.png') no-repeat center center;
      background-size: .46rem .46rem;
    }
    .zhuan {
      background: url('./../../../common/images/zhuan.png') no-repeat center center;
      background-size: .48rem .46rem;
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
      background: url('./../../../common/images/close.png') no-repeat center center;
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