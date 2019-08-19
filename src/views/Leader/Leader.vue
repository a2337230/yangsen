<template>
  <div class="leader">
    <!-- 头部 -->
    <header-box :title="title"></header-box>
    <div class="leader-container">
      <prop-list :prople="popList"></prop-list>
    </div>
  </div>
</template>
<script>
import HeaderBox from '@/components/Header'
import PropList from '@/components/PropList'
export default {
  name: 'leader',
  data () {
    return {
      title: '区域连锁领军人物风采榜',
      popList: [
        {
          avatar: require('./../../common/images/yy.jpg'),
          name: '爷爷',
          des: '一个藤上七朵花',
          path: ''
        },
        {
          avatar: require('./../../common/images/w1.jpg'),
          name: '大娃',
          des: '一个藤上七朵花',
          path: ''
        },
        {
          avatar: require('./../../common/images/w2.jpg'),
          name: '二娃',
          des: '一个藤上七朵花',
          path: ''
        },
        {
          avatar: require('./../../common/images/w3.jpg'),
          name: '三娃',
          des: '一个藤上七朵花',
          path: ''
        },
        {
          avatar: require('./../../common/images/w4.jpg'),
          name: '四娃',
          des: '一个藤上七朵花',
          path: ''
        },
        {
          avatar: require('./../../common/images/w5.jpg'),
          name: '五娃',
          des: '一个藤上七朵花',
          path: ''
        },
        {
          avatar: require('./../../common/images/w6.jpg'),
          name: '六娃',
          des: '一个藤上七朵花',
          path: ''
        },
        {
          avatar: require('./../../common/images/w7.jpg'),
          name: '七娃',
          des: '一个藤上七朵花',
          path: ''
        }
      ]
    }
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