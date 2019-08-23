<template>
  <div class="article-info">
    <header-nav :title="title"></header-nav>
    <!-- 正文内容 -->
    <scroll class="container" @click="closeInput" :noMore="true" :pullup="false" v-if="articleTitle">
      <div class="arcitle-video" @click="goCourse" v-if="isVideo">
        <img src="./../../../common/images/videobg.jpg" alt="">
        <i class="video-btn"></i>
      </div>
      <h2 class="article-title" @click="closeInput">{{articleTitle}}</h2>
      <p class="arcitle-info">
        <span>{{Author}}</span>
        <span>浏览量：{{Hit}}</span>
        <span>时间： {{time | timeFormat}}</span>
      </p>
      <div v-html="content" @click="closeInput">
        <!-- 文章内容 -->
      </div>
    </scroll>
    <!-- 评论 -->
    <div class="discuss">
      <div class="input" :class="{longInput: isInput}">
        <img src="./../../../common/images/dianping.png" alt="" v-if="!isInput">
        <input type="text" v-model="discuss1" placeholder="写评论..." @focus="isfocus" @blur="isBlur" class="isInput" ref="isInput" autocomplete="off">
      </div>
      <button class="submit" v-show="isInput" @click.stop="submitFrom">发送</button>
      <ul class="domain" v-show="!isInput">
        <li class="domain-item dis-num" @click="submitLike">
          <span class="dis-amount">{{likeNum}}</span>
            <img :src="isZan ? yesZan : noZan" alt="">
        </li>
        <li class="domain-item dis-num" @click="onDialog">
          <span class="dis-amount">
            {{reviewCount}}
          </span>
          <img src="./../../../common/images/pinglun.png" alt="">
        </li>
        <li class="domain-item" @click="isShare">
          <div class="share-icon"
            v-clipboard:copy="isHref" 
            v-clipboard:success="copy" 
            v-clipboard:error="onError"
            v-if="isH5"
          >
            <img src="./../../../common/images/zhuanfa.png" alt="">
          </div>
          <img src="./../../../common/images/zhuanfa.png" alt="" v-else>
        </li>
      </ul>
    </div>
    <!-- 评论弹出框 -->
    <div class="dis-dialog" @click.prevent>
      <div class="dis-container">
        <h2>全部评论</h2>
        <div class="close-dis" @click="outDialog"><i></i></div>
        <!-- <div class="content"> -->
          <scroll
           class="content"
           :data="reviewData"
           :noMore="noMore"
           :pullup="pullup"
           @scrollToEnd="_getReview"
           v-if="reviewData.length > 0"
           :key="revUpload"
          >
            <ul class="dis-content" @click="upDateRev">
              <li v-for="(item, index) in reviewData" :key="item.AddTime">
                <div class="user">
                  <div class="avatar">
                    <img :src="item.HeadImg ? 'https://img.xlxt.net' + item.HeadImg : defaultImg" alt="">
                  </div>
                  <div class="user-right">
                    <!-- 昵称 -->
                    <div class="user-pet">
                      <div class="pet">
                        <p>{{item.Name | nameFormat}}</p>
                      </div>
                      <div class="dianzan">
                        <div class="zan-btn" @click.stop="myLove(item, index)">
                          <span :class="{current: item.IsLike}">{{item.LikeNum}}<i></i></span>
                        </div>
                        <div class="review-btn" @click.stop="reviewReply(item)">
                          <span>回复</span>
                        </div>
                      </div>
                      <time class="time">{{item.AddTime | dateFormat}}</time>
                    </div>
                    <p class="user-discuss">
                      {{item.Content}}
                    </p>
                    <!-- 回复 -->
                    <div class="userreply" v-if="item.ArticleReviewReply.length > 0">
                      <div class="user reply" v-for="citem in item.ArticleReviewReply" :key="citem.AddTime">
                        <div class="avatar">
                          <img :src="citem.HeadImg ? 'https://img.xlxt.net' + citem.HeadImg : defaultImg" alt="">
                        </div>
                        <div class="user-right">
                          <!-- 昵称 -->
                          <div class="user-pet">
                            <div class="pet">
                              <p>{{citem.Name | nameFormat}}</p>
                            </div>
                            <time class="time">{{citem.AddTime | dateFormat}}</time>
                          </div>
                          <p class="user-discuss">
                            {{citem.Content}}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </scroll>
        <!-- </div> -->
        
        <div class="dis-footer">
          <input type="text" v-model="discuss2" :placeholder="placeholder" class="reviewInput" @focus="scrollTop" @blur="scrollTop" autocomplete="off">
          <span @click="reviewSubmit">{{reviewBtn}}</span>
        </div>
      </div>
    </div>
    <!-- 遮罩 -->
    <div class="shade" v-if="showShare"></div>
    <share-box :isShow="showShare" @exit="showShare = false" :url1="url1" :url2="url2"></share-box>
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
import HeaderNav from '@/components/Header'
import ShareBox from '@/components/Share'
import { Toast, MessageBox } from 'mint-ui';
import moment from 'moment'
import $ from 'jquery'
import util from '@/utils/util.js'
import { ArticleInfo1, ArticleInfo2, GetReviewFront, AddReview, AddReviewReply, AddReviewLike, GetArticleLike } from '@/api/index'
import Scroll from '@/components/scroll'
export default {
  name: 'articleInfo',
  data () {
    return {
      // 头部标题
      title: '正文',
      // isDialog: false,
      // 文章id
      id: 0,
      // 文章内容
      content: '',
      // 文章标题
      articleTitle: '',
      // 评论数
      reviewCount: 0,
      // 点赞数
      likeNum: 0,
      // 浏览量
      hit: 0,
      // 评论数据
      reviewData: [],
      // 评论时是否输入框占满整行
      isInput: false,
      // 首页评论
      discuss1: '',
      // 默认头像
      defaultImg: require('./../../../common/images/avatar.gif'),
      // 回复页发送按钮
      reviewBtn: '发送',
      // 评论输入框提示文字
      placeholder: '发表您的评论...',
      // 回复的评论ID和name
      reply: {
        id: 0,
        name: ''
      },
      // 回复输入内容
      discuss2: '',
      // 文章点赞
      isZan: false,
      // 未点赞
      noZan: require('./../../../common/images/dianzan.png'),
      // 已点赞
      yesZan: require('./../../../common/images/bigzan.png'),
      // 显示分享
      showShare: false,
      // 分享
      url1: '', // 微信
      url2: '',  // 朋友圈
      // 是否可发表评论
      isRiew: true,
      // 是否可回复
      isReply: true,
      // 是否无数据
      noMore: false,
      pageindex: 1,
      pullup: true,
      // 评论显示数
      reivewNum: 0,
      pagesize: 15,
      // 回复框发布评论置顶
      revUpload: String(new Date()),
      // 判断是否为H5
      isH5: false,
      // 复制链接地址
      isHref: '',
      clientH: document.body.clientHeight,
      // 禁止点赞连点
      isClickLike: true,
      arcitleID: this.$route.query.arcitleID,
      user: '',
      isShow: false,
      psd: '',
      isDialog: true,
      Author: '',
      isVideo: true
    }
  },
  created () {
    let psd = localStorage.getItem('isPsd')
    if (psd) {
      this.isDialog = false
    }
    this.id = this.$route.query.arcitleID
    let path = this.$route.query.path
    let type = this.$route.query.type
    let source = this.$route.query.source
    if (path === 'offline' || path === 'resale' || type === 'off') {
      this.isDialog = false
    }
    if (path === 'resale' || path==="study" || path === 'trade' || source === 'resale') {
      this.isVideo = false
    }
  },
  mounted () {
    window.scrollTo(0,0)
    if (this.isDialog) {
      setTimeout(() => {
        let psd = document.querySelector('.psd-box')
        psd.classList.add('psdTop')
      }, 200)
    }
    
    // this.user = util.getCookie('UserID') ? util.getCookie('UserID'): util.getCookie('u')
    this.user = '2d001adc288acf01f432a157ec482dc7'
    // this.isHref = this.BaseUrl +  `/articleInfo?id=${this.id}&hit=${this.hit}&share`
    this.isHref = window.location.href
    this._iosInput()
    var ua = navigator.userAgent.toLowerCase();
    // alert(ua)
    let ios = ua.indexOf("native_app_ios") > -1
    let android = ua.indexOf("glaer-android") > -1
    if (ios) {
      this.isH5 = false
    } else if (android) {
      this.isH5 = false
    } else {
      this.isH5 = true
    }
    this.getArt()
  },
  methods: {
    submitPsd () {
      if (this.psd.toLocaleLowerCase() === 'tfzx') {
        this.isDialog = false
      } else {
        this.isShow = true
      }
    },
    outBack () {
      let url = '/' +  this.$route.query.path
      this.$router.push(url)
    },
    // 跳转课程
    goCourse () {
      window.location.href = 'https://m2.xlxt.net/product/Course_Player.html?product_id=9653&isEnterpriseC=1&returnUrl=' + this.isHref
    },
    upDateRev () {
      this.discuss2 = '',
      this.reviewBtn = '发送'
      document.querySelector('.reviewInput').blur()
    },
    isBlur () {
      var u = navigator.userAgent
      let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
      let isSari = u.indexOf("Safari") > -1
      let ua = navigator.userAgent.toLowerCase()
      let ios = ua.indexOf("native_app_ios") > -1
      // alert(isiOS)
      if (isiOS) {
        window.scrollTo(0, 0)
      }
      // if (isiOS && !ios) {
      //   alert(1)
      //   this.submitFrom()
      // }
    },
    copy (e) {
      Toast('链接复制成功,快去粘贴吧')
    },
    onError (e) {
      Toast('复制失败')
    },
    // 防止ios输入框遮挡
    _iosInput () {
      let _this = this
      var u = navigator.userAgent
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
      if (isiOS) {
        $('.isInput').on('focus', function () {
          var target = this;
          // 使用定时器是为了让输入框上滑时更加自然
          setTimeout(function(){
            $('.discuss').css({
              'top': document.body.offsetHeight - $('.discuss').height()
            })
          },1000)
        })
      }
    },
    // 获取文章详情
    getArt () {
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
      this.articleTitle = result.Data.Title
      this.content = result.Data.Content
      this.Hit = result.Data.Hits
      this.time = result.Data.AddTime
      this.isZan = result.Data.IsLike
      this.likeNum = result.Data.ArticleLikeNum
      this.Author = result.Data.Author ? result.Data.Author : '杏林学堂'
      this._getReviewNum()
    },
    async getArcitle2 () {
      let result = await ArticleInfo2({
        articleid: this.arcitleID
      })
      this.articleTitle = result.Data.Title
      this.content = result.Data.Content
      this.Hit = result.Data.Hits
      this.time = result.Data.AddTime
      this.isZan = result.Data.IsLike
      this.likeNum = result.Data.ArticleLikeNum
      this.Author = result.Data.Author ? result.Data.Author : '杏林学堂'
      // this._getReviewNum()
    },
    // 获取文章评论数
    async _getReviewNum () {
      let result = await GetReviewFront({
        articleID: this.id,
        pagesize: this.pagesize,
        pageindex: this.pageindex
      })
      if (result.Code === 200) {
        if (result.Data.length === 0) {
        }
        this.reviewCount = result.Count
      }
    },
    // 获取文章评论
    async _getReview (val) {
      
      if (!this.pullup && val === undefined) {
        return
      }
      let result = await GetReviewFront({
        articleID: this.id,
        pagesize: this.pagesize,
        pageindex: this.pageindex
      })
      if (result.Code === 200) {
        if (result.Data.length % 15 !== 0 || result.Count === 15) {
          
          this.noMore = false
          this.pullup = false
        }
        this.pagesize = this.pagesize + 15
        // this.pageindex++
        this.reviewData = result.Data
        // this.reivewNum = this.reivewNum + 15
      }
    },
    // 打开评论框动画
    onDialog () {
      if (!this.user) {
        MessageBox({
          title: '提示',
          message: '登录后可以评论',
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: '登陆'
        }).then(action => {
          if (action === 'confirm') {
            window.location.href = 'https://sso.xlxt.net/applogin/login.html?ReturnUrl=' + this.isHref
          }
        })
        return 
      }
      this.pullup = true
      this.pagesize = 15
      this._getReview()
      $('.dis-dialog').show()
      $('.dis-container').animate({
        top: '0.88rem'
      }, 300)
    },
    // 关闭评论框动画
    outDialog () { 
      let _this = this
      $('.dis-container').animate({
        top: '100%'
      }, 300 , function () {
        _this.reviewData = []
        _this.pageindex = 1
        _this.discuss2 = ''
        _this.reviewBtn = '发送'
        _this.noMore = false
        $('.dis-dialog').hide()
      })
    },
    // 发表评论
    async submitFrom () {
      if (!this.discuss1) {
        Toast('请输入评价内容')
        this.isInput = false
        return
      }
      if (this.discuss1.length > 1000) {
        Toast('评价不能超过1000个字')
        this.isInput = false
        return
      }
      // 设定评论间隔
      if (this.isRiew) {
        this.isRiew = false
        let result = await AddReview({
          content: this.discuss1,
          articleID: this.id
        })
        if (result.Code === 200) {
          this.discuss1 = ""
          this.isInput = false
          this._getReviewNum()
          Toast({
            message: '评价成功',
            iconClass: 'iconfont icon-xiaolianchenggong',
            duration: 2000
          });
          setTimeout(() => {
            this.isRiew = true
          }, 10000)
        }
      } else {
        Toast('抱歉！10秒内仅能发表一次评论')
      }
    },
    reviewReply (val) {
      this.discuss2 = ''
      this.reply.name = val.Name
      this.reply.id = val.ArticleCommentID
      this.placeholder = '回复' + val.Name
      this.reviewBtn = '回复'
      document.querySelector('.reviewInput').focus()
    },
    async reviewSubmit () {
      if (!this.discuss2) {
        Toast('请输入评价内容')
        return
      }
      if (this.discuss1.length > 1000) {
        Toast('评价不能超过1000个字')
        this.isInput = false
        return
      }
      if (this.isReply) {
        this.isReply = false
        if (this.reviewBtn === '回复') {
          let result = await AddReviewReply({
            ArticleCommentID: this.reply.id,
            articleID: this.id,
            content: this.discuss2
          })
          if (result.Code === 200) {
            this.discuss2 = ''
            this.reviewBtn = '发送'
            this._getReview(true)
          }
        } else {
          let result = await AddReview({
            content: this.discuss2,
            articleID: this.id
          })
          if (result.Code === 200) {
            this.discuss2 = ""
            this.revUpload = String(new Date())
            this._getReview(true)

          }
        }
        setTimeout(() => {
          this.isReply = true
        }, 10000)
      } else {
        Toast('抱歉！10秒内仅能发表一次评论')
      }
      
    },
    async myLove (val, index) {
      if (this.isClickLike) {
        this.isClickLike = false
        document.querySelector('.reviewInput').blur()
        this.reviewBtn = '发送'
        this.discuss2 = ''
        let isLike = val.IsLike ? 0 : 1
        let result = await AddReviewLike({
          like: isLike,
          articleID: this.id,
          ArticleCommentID: val.ArticleCommentID
        })
        if (result.Code === 200) {
          // this._getReview()
          this.reviewData[index].IsLike = Boolean(isLike)
          if (isLike) {
            this.reviewData[index].LikeNum++
          } else {
            this.reviewData[index].LikeNum--
          }
          this.isClickLike = true
        }
      }
      
    },
    async submitLike () {
      if (!this.user) {
        MessageBox({
          title: '提示',
          message: '登录后可以点赞',
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: '登陆'
        }).then(action => {
          if (action === 'confirm') {
            window.location.href = 'https://sso.xlxt.net/applogin/login.html?ReturnUrl=' + this.isHref
          }
        }, cancel => {
        })
        return
      }
      let isLike = this.isZan ? 0 : 1
      let result = await GetArticleLike({
        like: isLike,
        articleID: this.id
      })
      if (result.Code === 200) {
        this.getArt()
      }
    },
    isShare () {
      if (this.isH5) {
        return
      }
      let bdPic = '/IMG/logoimg.png'
      let bdPicAndroid = 'https://img.xlxt.net/' + bdPic
      let w = window.location.href
      let header = this.articleTitle
      let info = ''
      let u = navigator.userAgent
      // if (ua.indexOf("glaer-android") > -1 || ua.indexOf("glaer-ios") > -1) {
          // isinApp = true;
      if (u.indexOf('Android') > -1 || u.indexOf('Adr') > -1) {
          this.url1 = "glaer:weixinshare:" + w + "|" + header + "|" + 1 + "|" + bdPicAndroid + "|" + info;
          this.url2 = "glaer:weixinshare:" + w + "|" + header + "|" + 0 + "|" + bdPicAndroid + "|" + info;
      }else {
          this.url1 = "glaer:weixinshare:" + w + "|" + header + "|" + 1 + "|" + bdPic + "|" + info;
          this.url2 = "glaer:weixinshare:" + w + "|" + header + "|" + 0 + "|" + bdPic + "|" + info;
      }
      this.showShare = true
    },
    closeInput () {
      $('.isInput').blur()
      this.isInput = false
    },
    isfocus () {
      this.isInput = true
    },
    // 兼容苹果
    scrollTop () {
      setTimeout(() => {
      document.body.scrollTop = document.body.scrollHeight//解决输入框弹起遮挡等BUG
      }, 300)
    }
  },
  filters: {
    dateFormat (val) {
      moment.locale('zh-cn', {
        months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
        monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
        weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
        weekdaysShort: '周日_周一_周二_周三_周四_周五_周六'.split('_'),
        weekdaysMin: '日_一_二_三_四_五_六'.split('_'),
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'YYYY-MM-DD',
            LL: 'YYYY年MM月DD日',
            LLL: 'YYYY年MM月DD日Ah点mm分',
            LLLL: 'YYYY年MM月DD日ddddAh点mm分',
            l: 'YYYY-M-D',
            ll: 'YYYY年M月D日',
            lll: 'YYYY年M月D日 HH:mm',
            llll: 'YYYY年M月D日dddd HH:mm'
        },
        meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
        meridiemHour: function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === '凌晨' || meridiem === '早上' ||
                meridiem === '上午') {
                return hour;
            } else if (meridiem === '下午' || meridiem === '晚上') {
                return hour + 12;
            } else {
                // '中午'
                return hour >= 11 ? hour : hour + 12;
            }
        },
        meridiem: function (hour, minute, isLower) {
            const hm = hour * 100 + minute;
            if (hm < 600) {
                return '凌晨';
            } else if (hm < 900) {
                return '早上';
            } else if (hm < 1130) {
                return '上午';
            } else if (hm < 1230) {
                return '中午';
            } else if (hm < 1800) {
                return '下午';
            } else {
                return '晚上';
            }
        },
        calendar: {
            sameDay: '[今天]LT',
            nextDay: '[明天]LT',
            nextWeek: '[下]ddddLT',
            lastDay: '[昨天]LT',
            lastWeek: '[上]ddddLT',
            sameElse: 'L'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(日|月|周)/,
        ordinal: function (number, period) {
            switch (period) {
                case 'd':
                case 'D':
                case 'DDD':
                    return number + '日';
                case 'M':
                    return number + '月';
                case 'w':
                case 'W':
                    return number + '周';
                default:
                    return number;
            }
        },
        relativeTime: {
            future: '刚刚',
            past: '%s前',
            s: '刚刚',
            ss: '%d秒',
            m: '1分钟',
            mm: '%d分钟',
            h: '1小时',
            hh: '%d小时',
            d: '1天',
            dd: '%d天',
            M: '1个月',
            MM: '%d个月',
            y: '1年',
            yy: '%d年'
        },
        week: {
            // GB/T 7408-1994《数据元和交换格式·信息交换·日期和时间表示法》与ISO 8601:1988等效
            dow: 1, // Monday is the first day of the week.
            doy: 4  // The week that contains Jan 4th is the first week of the year.
        }
      })
      return moment(val).startOf('second').fromNow(true)
      // return moment(new Date).fromNow()
    },
    nameFormat (val) {
      if (val) {
        return val.substr(0,9)
      } else {
        return val
      }
      
    },
    timeFormat (val) {
      let time = val.substring(6, val.length - 2)
      return moment(Number(time)).format('YYYY-MM-DD')
    }
  },
  watch: {
    reviewBtn (val) {
      if (val === '发送') {
        this.placeholder = '发表您的评论...'
      } else {
        this.placeholder = '回复' +  this.reply.name 
      }
    },
    isInput (val) {
      if (!val) {
        this.discuss1 = ''
      }
    }
  },
  components: {
    HeaderNav,
    ShareBox,
    Scroll
  }
}
</script>
<style lang="less" scoped>
.article-info {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
}
.container {
  // margin-top: .88rem;
  padding: 0.88rem .3rem 1.3rem;
  height: calc(~"100% - 1.98rem");
  box-sizing: border-box;
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
  .arcitle-info {
    padding: .2rem 0;
    font-size: .26rem;
    color: #848484;
    span {
      &:nth-of-type(2) {
        padding: 0 .3rem;
      }
    }
  } 
  .article-title {
    font-size: .5rem;
    line-height: .58rem;
    padding-top: .5rem;
  }
  .article-hit {
    text-align: right;
    font-size: .26rem;
    color: #666;
  }
}
.discuss {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: .98rem;
  box-shadow:0px -1px 10px 0px rgba(0,0,0,0.06);
  padding: 0 .3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  background-color: #fff;
  .input {
    width: 3.3rem;
    height: .7rem;
    background-color: #F7F7F7;
    display: flex;
    align-items: center;
    padding-left: .25rem;
    border-radius: .35rem;
    // transition: .5s;
    display: flex;
    justify-content: space-between;
    img {
      width: .22rem;
      height: .28rem;
    }
    input {
      padding-left: .1rem;
      font-size: .28rem;
      line-height: .4rem;
    }
  }
  .longInput {
    width: calc(~"100% - 1.4rem");
    input {
      width: 100%;
      padding-right: .2rem;
    }
  }
  .submit {
    // width: 1rem;
    // height: .7rem;
    padding: 0 .2rem;
    background-color: #54B2F1;
    border-radius: .5rem;
    font-size: .3rem;
    line-height: .7rem;
    text-align: center;
    color: #fff;
    position: relative;
    z-index: 11;
  }
  .domain {
    display: flex;
    width: 2.8rem;
    height: 100%;
    align-items: center;
    justify-content: space-around;
    .domain-item {
      width: .5rem;
      height: .5rem;
      text-align: center;
      line-height: .5rem;
      &:nth-of-type(2) img{
        height: .41rem;
      }
      &:nth-of-type(3) img{
        height: .50rem;
      }
      &:nth-of-type(1) img {
        position: relative;
        top: -0.06rem;
      }
      img {
        width: .44rem;
        height: .46rem;
        vertical-align: middle;
      }
    }
    .dis-num {
      position: relative;
      .dis-amount {
        position: absolute;
        min-width: .06rem;
        padding: 0 .1rem;
        height: .20rem;
        text-align: center;
        font-size: .14rem;
        line-height: .2rem;
        border-radius: .1rem;
        background-color: #F95152;
        color: #fff;
        top: -0.03rem;
        left: .3rem;
      }
    }
  }
}
.dis-dialog {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0,0,0,0.4);
  padding-top: .88rem;
  box-sizing: border-box;
  z-index: 1000;
  display: none;
}
.dis-container {
  position: absolute;
  width: 100%;
  top: 100%;
  // min-height: 100%;
  height: calc(~"100% - 0.86rem");
  overflow: hidden;
  background-color: #fff;
  border-radius:.5rem .5rem 0 0;
  box-sizing: border-box;
  padding: .3rem;
  // transition: 1s;
  box-sizing: border-box;
  .close-dis {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    width: 1.1rem;
    height: 1.1rem;
    justify-content: center;
    align-items: center;
    i {
      width: .26rem;
      height: .26rem;
      background: url('./../../../common/images/close.png') no-repeat;
      background-size: .26rem .26rem;
    }
  }
  h2 {
    font-size: .36rem;
    line-height: .5rem;
    position: relative;
    padding-bottom: .3rem;
    border-bottom: 1px solid #f7f7f7;
  }
  .content {
    height: calc(~"100% - 1.48rem");
    overflow: hidden;
  }
  .dis-content {
    // height: calc(~"100% - 1.5rem");
    padding-bottom: .3rem;
    box-sizing: border-box;
    li {
      padding-top: .3rem;
      .user {
        display: flex;
        .avatar {
          width: .8rem;
          height: .8rem;
          border-radius: 50%;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .user-right {
          // flex: 1;
          width: calc(~"100% - 1rem");
          padding-left: .2rem;
          .user-pet {
            display: flex;
            height: .8rem;
            flex-direction: column;
            justify-content: space-between;
            position: relative;
            .dianzan {
              position: absolute;
              right: 0;
              display: flex;
              .review-btn {
                padding: .3rem;
              }
              .zan-btn {
                padding: .3rem .1rem;
                display: flex;
                span {
                  font-size: .3rem;
                  position: relative;
                  top: -0.13rem;
                }
                i {
                  margin-left: .2rem;
                  display: inline-block;
                  width: .52rem;
                  height: .52rem;
                  background: url('./../../../common/images/dianzan.png') no-repeat 0 .2rem;
                  background-size: .3rem .3rem;
                }
              }
              span {
                color: #B6B6B6;
                font-size: .22rem;
              }
              .current {
                color: #1890FF;
                i {
                  background: url('./../../../common/images/dianzan2.png') no-repeat 0 .2rem;
                  background-size: .3rem .3rem;
                }
              }
            }
            .pet  {
              width: 100%;
              display: flex;
              justify-content: space-between;
              line-height: .42rem;
              margin-bottom: .1rem;
              p {
                color: #666;
                font-size: .28rem;
                // position: relative;
                // top: .08rem;
                // height: .28rem;
                // line-height: .4rem;
              }
            }
            .time {
              font-size: .24rem;
              line-height: .32rem;
              color: #848484;
            }
          }
          .user-discuss {
            margin-top: .15rem;
            font-size: .28rem;
            line-height: .44rem;
            color: #333;
            word-wrap:break-word;
            // width: 3rem;
          }
        }
      }
      .reply {
        background-color: #F7F7F7;
        margin-top: .2rem;
        border-radius: .2rem;
        padding: .22rem;;
      }
    }
  }
}
.dis-footer {
  position: absolute;
  top: calc(~"100% - 0.98rem");
  width: 100%;
  left: 0;
  height: .98rem;
  box-shadow:0px -1px .1rem 0px rgba(0,0,0,0.06);
  z-index: 55;
  background-color: #fff;
  padding: 0 .3rem;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  input {
    width: 5.39rem;
    height: .6rem;
    background-color: #f7f7f7;
    border-radius: .35rem;
    padding-left: .3rem;
    font-size: .28rem;
    line-height: .6rem;
  }
  span {
    display: inline-block;
    width: 1rem;
    height: .64rem;
    text-align: center;
    background-color: #54b2f1;
    color: #fff;
    border-radius: .3rem;
    line-height: .64rem;
    font-size: .28rem;
  }
}
.dis_on {
  top: 0.88rem;
}
.reply .time {
  top: 0 !important;
}
.shade {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,0.4);
  z-index: 10;
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