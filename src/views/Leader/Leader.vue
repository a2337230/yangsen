<template>
  <div class="leader">
    <!-- 头部 -->
    <header-box :title="title"></header-box>
    <div class="leader-container">
      <prop-list :prople="popList" v-if="popList.length > 0"></prop-list>
    </div>
  </div>
</template>
<script>
import HeaderBox from '@/components/Header'
import PropList from '@/components/PropList'
import prople from './../../common/JS/prople'
export default {
  name: 'leader',
  data () {
    return {
      title: '区域连锁领军人物风采榜',
      popList: []
    }
  },
  created () {
    this.popList = prople.prople()
  },
  components: {
    HeaderBox,
    PropList
  }
}
</script>
<style lang="less" scoped>
.leader-container {
  padding: 0 .3rem;;
}
</style>