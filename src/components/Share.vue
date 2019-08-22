<template>
  <div class="share" :class="{show: showShare}">
    <ul class="share-container">
      <li>
        <a :href="url2">
          <!-- <i class="iconfont icon-weixin"></i> -->
          <div class="share-icon">
            <img src="./../common/images/weixin.png" alt="">
          </div>
        </a>
        <span>微信好友</span>
      </li>
      <li>
        <a :href="url1">
          <!-- <i class="iconfont icon-pengyouquan"></i> -->
          <div class="share-icon" >
            <img src="./../common/images/pengyouquan.png" alt="">
          </div>
        </a>
        <span>朋友圈</span>
      </li>
      <li>
          <!-- <i class="iconfont icon-pengyouquan"></i> -->
          <div class="share-icon"
            v-clipboard:copy="invitationCode" 
            v-clipboard:success="copy" 
            v-clipboard:error="onError"
          >
            <img src="./../common/images/lianjie.png" alt="">
          </div>
        <span>复制链接</span>
      </li>
    </ul>
    <div class="out-btn" @click="exit">
      取消
    </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui'
export default {
  name: 'Share',
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    url1: {
      type: String,
      default: ''
    },
    url2: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      showShare: false,
      invitationCode: window.location.href + '&share'
    }
  },
  methods: {
    exit () {
      this.showShare = false
      this.$emit('exit')
    },
    copy (e) {
      Toast('复制成功')
    },
    onError (e) {
      Toast('复制失败')
    }
  },
  watch: {
    isShow (val) {
      this.showShare = val
    }
  }
}
</script>
<style lang="less" scoped>
.share {
  position: fixed;
  bottom: -100%;
  z-index: 9999;
  width: 100%;
  background-color: #fff;
  border-radius:20px 20px 0px 0px;
  // border-top: 1px solid #F9F9F9;
  // padding-top: .3rem;
  transition: .5s;
  .share-container {
    display: flex;
    border-bottom: 1px solid #F9F9F9;
    padding-bottom: .3rem;
    background-color: #F6F6F6;
    display: flex;
    justify-content: space-around;
    padding-top: .44rem;
    border-radius:20px 20px 0px 0px;
    li {
      width: 1.5rem;
      display: flex;
      flex-direction: column;
      margin-right: .3rem;
      text-align: center;
      -webkit-tap-highlight-color: rgba(0,0,0,0);
      -webkit-tap-highlight-color: transparent;
      display: flex;
      flex-direction: column;
      align-items: center;
      i {
        font-size: 1rem;
        color: #4eb575;
      }
      .share-icon {
        width: 1.2rem;
        height: 1.2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #fff;
        border-radius:10px;
        &:nth-of-type(1) img {
          width: .75rem;
          height: .57rem;
        }
        &:nth-of-type(2) img {
          width: .6rem;
          height: .63rem;
        }
        img {
          width: .6rem;
          height: .63rem;
          &:nth-of-type(1){
            width: .75rem;
            height: .57rem;
          }
        }
      }
      span {
        font-size: .28rem;
        line-height: .5rem;
        margin-top: .28rem;
      }
    }
  }
  .out-btn {
    text-align: center;
    line-height: .88rem;
    color: #404040;
  }
}
.show {
  bottom: 0;
}
</style>
