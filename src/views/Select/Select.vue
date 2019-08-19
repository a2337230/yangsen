<template>
  <div class="select">
    <span @click="isOpen = !isOpen">个人大赛</span>
    <div class="arror">
      ▲
    </div>
    <div class="options" :class="{current: isOpen}" v-show="isOpen">
      <ul>
        <li v-for="item in list" :key="item.id">{{item.name}}</li>
      </ul>
    </div>
    
  </div>
</template>
<script>
export default {
  name: 'select1',
  props: {
    list: {
      type: Array,
      default: () => { return [] }
    },
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      minH: 0
    }
  },
  mounted() {
    this.list = [
      {
        id: 1,
        name: '广州赛区'
      },
      {
        id: 1,
        name: '广州赛区'
      },
      {
        id: 1,
        name: '广州赛区'
      },
      {
        id: 1,
        name: '广州赛区'
      },
      {
        id: 1,
        name: '广州赛区'
      },
    ]
    if (list.length < 5) {
      this.minH = 0.7 * list.length + 'rem'
    } else {
      this.minH = 0.7 * 5 + 'rem'
    }
    
  },
}
</script>
<style lang="css" scoped>
  .select {
    width: 2rem;
    min-height: 0.7rem;
    background-color: rgba(67,131,250,1);
    border-radius: 0.2rem;
    color: #fff;
    line-height: 0.7rem;
    text-align: center;
    font-size: .3rem;
    position: relative;
    transition: .5s;
  }
  .select .arror {
    height: .7rem;
    line-height: .7rem;
    position: absolute;
    top: 0;
    right: .1rem;
    color: #fff;
    font-style: normal;
    font-size: .3rem;
  }
  .select .options {
    height: 0;
  }
  .select .current {
    /* height: 100%; */
    max-height: 3.5rem;
    overflow-y: scroll;
  }
  .select .options ul{
    min-width: 0;
  }
</style>