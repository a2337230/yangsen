<template>
  <div class="resale">
    <header-box :title="title"></header-box>
    <div class="res-container">
      <ul class="retail-menu">
        <li class="retail-list" v-for="(item,index) in resaleData" :key="index">
          <div class="img-left">
            <img :src="item.img" alt="">
          </div>
          <div class="right-des">
            <h3>{{item.title}}</h3>
            <p>{{item.des}}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import HeaderBox from '@/components/Header'
import { tradeArticle  } from '@/api/index'
export default {
  name: 'trade',
  data () {
    return {
      title: '读书报告',
      resaleData: [
        {
          img: require('./../../common/images/banner01.jpg'),
          title: '九月九日忆山东兄弟',
          des: '独在异乡为异客，每逢佳节倍思亲。遥知兄弟登高处，遍插茱萸少一人。 '
        },
        {
          img: require('./../../common/images/banner02.jpg'),
          title: '黄鹤楼送孟浩然之广陵',
          des: '故人西辞黄鹤楼，烟花三月下扬州。孤帆远影碧空尽，唯见长江天际流。 '
        },
        {
          img: require('./../../common/images/banner03.jpg'),
          title: '早发白帝城',
          des: '朝辞白帝彩云间，千里江陵一日还。两岸猿声啼不住，轻舟已过万重山。'
        },
        {
          img: require('./../../common/images/banner04.jpg'),
          title: '乌衣巷',
          des: '朱雀桥边野草花，乌衣巷口夕阳斜。 旧时王谢堂前燕，飞入寻常百姓家。'
        },
        {
          img: require('./../../common/images/banner01.jpg'),
          title: '九月九日忆山东兄弟',
          des: '独在异乡为异客，每逢佳节倍思亲。遥知兄弟登高处，遍插茱萸少一人。 '
        },
        {
          img: require('./../../common/images/banner02.jpg'),
          title: '黄鹤楼送孟浩然之广陵',
          des: '故人西辞黄鹤楼，烟花三月下扬州。孤帆远影碧空尽，唯见长江天际流。 '
        },
        {
          img: require('./../../common/images/banner03.jpg'),
          title: '早发白帝城',
          des: '朝辞白帝彩云间，千里江陵一日还。两岸猿声啼不住，轻舟已过万重山。'
        },
        {
          img: require('./../../common/images/banner04.jpg'),
          title: '乌衣巷',
          des: '朱雀桥边野草花，乌衣巷口夕阳斜。 旧时王谢堂前燕，飞入寻常百姓家。'
        }
      ]
    }
  },
  created () {
    this._tradeArticle()
  },
  methods: {
    async _tradeArticle () {
      let result = await tradeArticle()
      console.log(result)
    }
  },
  components: {
    HeaderBox
  }
}
</script>
<style lang="less" scoped>
.res-container {
  padding: 0 .3rem;
  margin-bottom: .3rem;
}
.retail-list {
  width: 100%;
  padding-top: .3rem;
  display: flex;
  .img-left {
    width: 3.3rem;
    height: 2rem;
    img {
      width: 100%;
      height: 100%;
      border-radius: .2rem;
    }
  }
  .right-des {
    flex: 1;
    padding-left: .2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    h3 {
      font-weight: normal;
      font-size: .3rem;
      margin-bottom: .3rem;
      font-weight: 500;
      color: #333;
    }
    p {
      font-size: .26rem;
      color: #999;
      padding-bottom: .2rem;
    }
  }
}
</style>