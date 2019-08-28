<template>
  <div class="leader-info">
    <header-box :title="title" style="zIndex: 999999"></header-box>
    <div class="leader-video">
      <div class="prism-player" id="J_prismPlayer"></div>
    </div>
    <div class="leader-content">
      <div class="leader-name">{{title}}</div>
      <div class="content" v-html="content"></div>
    </div>
  </div>
</template>
<script>
import HeaderBox from '@/components/Header'
import prople from './../common/JS/prople'
import VideoBox from '@/components/Video'
import { VideoPlay } from '@/api/index'
import $ from 'jquery'
export default {
  name: 'leader-info',
  data () {
    return {
      backUrl: '',
      title: '人物简介',
      LeaderData: '',
      videoId: '',
      content: '',
      VideoImg: ''
    }
  },
  created () {
    this.backUrl = this.$route.query.path
    let id = this.$route.query.id
    this.LeaderData = prople.prople()[id]
    this.title = this.LeaderData.name
    this.videoId = this.LeaderData.video
    this.content = this.LeaderData.content
    this.VideoImg = this.LeaderData.avatar
    window.scrollTo(0,0)
  },
  mounted () {
    this.playVideo()
  },
  methods: {
     async playVideo() {
      let _this = this
      let result = await VideoPlay({
        VideoID: this.videoId
      })
      if (result.Code === 200) {
        let data = JSON.parse(result.Data) 
        _this.player = new Aliplayer({
          id: 'J_prismPlayer',
          width: '100%',
          height: '100%',
          autoplay:false,
          preload: false,
          vid: _this.videoId,
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
            let btn = document.querySelector('.prism-big-play-btn')
            btn.style.left = '50%'
            btn.style.marginLeft = '-31px'
            btn.style.bottom = '40%'
            if(isiOS || huawei.includes('huawei')) {
              $("#J_prismPlayer").find(".prism-fullscreen-btn").css('display',  'none')
            }
        })
      }
    },
  },
  components: {
    HeaderBox,
    VideoBox
  }
}
</script>
<style lang="less" scoped>
.leader-video {
  width: calc(~"100vw - 0.6rem");
  height: 3.34rem;
  margin: 0 auto;
  background-color: #000;
  border-radius: .2rem;
  overflow: hidden;
}  
.leader-content {
  padding: .28rem .3rem;
  .leader-name {
    font-weight: bold;
    font-size: .36rem;
    line-height: .5rem;
  }
  .content {
    // padding-top: .3rem;
    font-size: .36rem;
    color: #222;
  }
}
</style>