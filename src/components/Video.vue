<template>
  <div class="video-box">
    <div class="drap" @click="closeVideo"></div>
    <div class="prism-player" id="J_prismPlayer"></div>
  </div>
</template>
<script>
import { VideoPlay } from '@/api/index'
import $ from 'jquery'
export default {
  name: 'video1',
  props: {
    VideoId: {
      type: String,
      default: '8a786cfbeeba418e8e9fcd1a880b1c2e'
    },
    VideoImg: {
      type: String,
      default: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566364830889&di=975491540be619ed6950a807b2fcf5f3&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F038bb1e576134a50000018c1bacd997.jpg',
    }
  },
  data () {
    return {
      player: '',
      // 默认图片
      defaultVideoImg: require('./../common/images/banner03.jpg'),
      player: '',
      // 兼容IOS
      x5_type: '',
      cover_img: require('./../common/images/banner03.jpg')
    }
  },
  created () {
    var ua = navigator.userAgent.toLowerCase();
    let ios = ua.indexOf("native_app_ios") > -1
    if (ios) {
      this.x5_type = 'h5'
    }
  },
  mounted () {
    let _this = this
    this.playVideo()
  },
  methods: {
     async playVideo() {
      let _this = this
      let result = await VideoPlay({
        VideoID: this.VideoId
      })
      if (result.Code === 200) {
        let data = JSON.parse(result.Data) 
        _this.player = new Aliplayer({
          id: 'J_prismPlayer',
          width: '100%',
          height: '250px',
          autoplay:false,
          preload: false,
          vid: _this.VideoId,
          playauth: data.PlayAuth,
          useH5Prism:true,
          x5_fullscreen:false,
          playsinline:true,
          x5_type: _this.x5_type, // 不启用同层播放，设置为h5 则为启用
          qualitySort: true,
          controlBarVisibility:'click',
          showBarTime:3000,//配合click使用
          cover: _this.VideoImg ? _this.VideoImg : _this.defaultVideoImg,

        }, function (player) {
            _this.$emit('codeing')
            $("#J_prismPlayer video").attr("poster", _this.cover_img)
            var userAgent = navigator.userAgent
            // 判断华为手机
            let huawei = navigator.appVersion.toLowerCase()
            var isiOS = !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
            
            if(isiOS || huawei.includes('huawei')) {
              $("#J_prismPlayer").find(".prism-fullscreen-btn").css('display',  'none')
            }
            // if(navigator.userAgent.toLowerCase().indexOf("iphone")) {
            //     $("#J_prismPlayer").find(".prism-fullscreen-btn").css('display',  'none')
            // }
            setTimeout(()=> {
              $('.prism-cover').css({
                'backgroundSize': 'cover'
              })
            }, 1000)
        })
      }
    },
    closeVideo () {
      this.$emit('cliseVideo')
    }
  },
  watch: {
    VideoImg () {
      // this.player.dispose()
      let alVideo = document.getElementById('J_prismPlayer')
      alVideo.remove()
      let videoBox = document.querySelector('.video-box')
      videoBox.innerHTML = '<div class="prism-player" id="J_prismPlayer"></div>'
      this.playVideo()
    }
  }
}
</script>
<style lang="less" scoped>
.video-box {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 99999;
  background-color: #000;
  display: flex;
  align-items: center;
  .drap {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1;
    background-color: #000;
    display: flex;
    align-items: center;
  }
}
.video-box /deep/ .prism-player  {
  width: 100%;
  height: 250px;
  // background-color: blue;
  position: relative;
  z-index: 5;
}
.video-box /deep/ .prism-big-play-btn {
  left: 50% !important;
  // top: 50% !important;
  margin-left: -30px;
}
.video-box /deep/ .prism-player video {
  width: 100% !important;
  height: 100% !important;
  object-fit: contain !important;
  object-position: 50% 50% !important;
 }
.video-box /deep/ .prism-cover {
  background-size: cover;
}
.video-box /deep/ .prism-player video.center {
  object-position: 50% 50% !important;
 }
</style>
