import Vue from 'vue'
import App from './App'
import router from './router'
import VueClipboard from 'vue-clipboard2'
import Mint from 'mint-ui'
import Vconsole from 'vconsole'
import FastClick from 'fastclick'
import 'mint-ui/lib/style.css'
let vConsole = new Vconsole()
export default vConsole
Vue.config.productionTip = false
Vue.use(Mint)
Vue.use(VueClipboard)
FastClick.attach(document.body)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
