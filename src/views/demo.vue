<template>
  <div v-html="content">
    
  </div>
</template>
<script>
import { GetInfoByID } from '@/api/index'
export default {
  name: 'demo',
  created () {
    this.getDemo()
  },
  data() {
    return {
      content: ''
    }
  },
  methods: {
    async getDemo () {
      let result = await GetInfoByID({
        helpID: 51
      })
      this.content = result.Data.Content
      console.log(result)
    }
  },
}
</script>