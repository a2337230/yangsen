<template>
  <div ref="wrapper" class="scroll-wrap">
    <div>
      <slot></slot>
      <div v-if="pullup" class="pullup">
        <div class="clear" v-if="!isDone">
          <div class="fl"><img width="30" src="./../common/images/loading.gif"></div>
          <div class="fl lh30 ml10">加载中.....</div>
        </div>
        <div class="list-donetip" v-if="!isLoading && isDone">
          <slot name="doneTip">只显示这么多啦~</slot>
        </div>
      </div>
      <div v-else class="nomore">{{noMore==true?'':'暂无更多~'}}</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
import { debug } from 'util';
  export default {
    props: {
      probeType: {
        type: Number,
        default: 1,
      },
      click: {
        type: Boolean,
        default: true
      },
      listenScroll: {
        type: Boolean,
        default: false
      },
      data: {
        type: Array,
        default: null
      },
      pullup: {
        type: Boolean,
        default: true
      },
      pulldown: {
        type: Boolean,
        default: false
      },
      beforeScroll: {
        type: Boolean,
        default: false
      },
      refreshDelay: {
        type: Number,
        default: 20
      },
      /**
       * 是否开启横向滚动
       */
      scrollX:{
        type:Boolean,
        default:false
      },
      noMore:{
        type:Boolean,
        default:false
      },
      // isLoading:{
      //   type:Boolean
      // }
    },
    mounted() {
      setTimeout(() => {
        this._initScroll()
      }, 20)
    },
    data(){
      return {
        isLoading: false,
        isDone: false,
        isload: 0
      }
    },

    updated(){
    },
    methods: {
      _initScroll() {
        if (!this.$refs.wrapper) {
          return
        }
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click,
          scrollX:this.scrollX,
        })

        if (this.listenScroll) {
          let me = this
          this.scroll.on('scroll', (pos) => {
            me.$emit('scroll', pos)
          })
        }

        if (this.pullup) {
          this.scroll.on('scrollEnd', () => {
            if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
              //所有数据加载完毕后
              this.$on('infinitescroll.loadedDone', () => {
                this.isLoading = false;
                this.isDone = true;
              });
              //单次请求数据加载完毕后
              this.$on('infinitescroll.finishLoad', (ret) => {
                this.isLoading = false;
              });
              //重新初始化
              this.$on('infinitescroll.reInit', () => {
                this.isLoading = false;
                this.isDone = false;
              });
              this.isload++
              this.$emit('scrollToEnd')
            }
          })
        } else {
          this.isLoading = false;
          this.isDone = true;
        }

        if (this.pulldown) {
          this.scroll.on('touchend', (pos) => {
            // 下拉动作
            if (pos.y > 50) {
              this.$emit('pulldown')
            }
          })
        }

        if (this.beforeScroll) {
          this.scroll.on('beforeScrollStart', () => {
            this.$emit('beforeScroll')
          })
        }
      },
      resetParams(){
        setTimeout(() => {
          this.isLoading = false;
          this.isDone = false;
        },600)
      },
      disable() {
        this.scroll && this.scroll.disable()
      },
      enable() {
        this.scroll && this.scroll.enable()
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      scrollTo() {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement() {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      }
    },
    watch: {
      data() {
        setTimeout(() => {
          this.refresh()
        }, this.refreshDelay)
      },
      noMore (val) {
        if (val) {
          this.isDone = true
          this.noMore = true
        } else {
          this.isDone = false
          this.pullup = false
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .pullup {
    width:100%;
    height:50px;
    position: relative;
    font-size: 13px;
    margin-top: -15px;
    div.clear {
      padding:10px 0px;
      font-size: 13px;
      position: absolute;
      width: 31%;
      left:50%;
      top:5px;
      transform:translate(-50%,0);
      .fl {
        float: left;
        line-height: 26px;
      }
    }
  }

.list-donetip {
  text-align:center;
  line-height:50px;
  font-size: 13px;
}
  
.nomore {
  text-align:center;
  line-height:15px;
  font-size: 13px;
  margin-top: 6px;
  margin-bottom: 12px;
  z-index: 999;
  position: relative;
  top: -0.3rem;
}
</style>

